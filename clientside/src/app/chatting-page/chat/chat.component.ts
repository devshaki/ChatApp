import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { GroupDto } from '../../dto/group.dto';
import { MessageDto } from 'src/app/dto/message.dto';
import { ApiService } from 'src/app/api.service';
import { SocketIoService } from 'src/app/socket-io.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  selectedGroup: GroupDto | null = null;
  // @Input() set SelectedGroup(group: GroupDto | null) {
  //   this.selectedGroup = group;
  // }

  messages: MessageDto[] | null = null;

  messageInput: string = '';

  constructor(
    private readonly apiService: ApiService,
    private readonly socketioService: SocketIoService,
    private readonly router: Router,
    private readonly activetedRoute: ActivatedRoute,
    private readonly cookieService: CookieService
  ) {}

  sendMessage() {
    if (!this.selectedGroup) {
      return;
    }
    const newMessage: MessageDto = {
      chatId: this.selectedGroup.groupId,
      body: this.messageInput,
    };
    this.socketioService.sendMessage(newMessage);
    this.messageInput = '';
  }
  private messageSub: any;

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navigationEvent = event as NavigationEnd;
        console.log('URL changed to:', navigationEvent.url);
        if (navigationEvent.url.startsWith('/chat/')) {
          const chatId = navigationEvent.url.split('/chat/')[1];
          this.loadChat(chatId);
        }
      });
    this.messageSub = this.socketioService.message$.subscribe(
      (message: MessageDto) => {
        if (
          this.selectedGroup &&
          message.chatId === this.selectedGroup.groupId
        ) {
          if (!this.messages) {
            this.messages = [];
          }
          this.messages.push(message);
        }
      }
    );
  }

  private loadChat(chatId: string) {
    this.apiService.getGroup(chatId).subscribe({
      next: (group: GroupDto) => {
        this.messages = null;
        this.selectedGroup = group;
        if (group.isDm) {
          this.apiService.getMembersInGroup(chatId).subscribe({
            next: (members: string[]) => {
              const currentUsername = this.cookieService.get('username');
              const contactName = members.find(
                (member) => member !== currentUsername
              );
              if (contactName && this.selectedGroup) {
                this.selectedGroup.name = contactName;
              }
            },
          });
        }

        this.updateMessages();
      },
    });
  }

  onEditGroup(group: GroupDto | null): void {
    if (group) {
      this.router.navigate(['/group-editor'], {
        state: { group },
      });
    }
  }
  ngOnDestroy(): void {
    if (this.messageSub) {
      this.messageSub.unsubscribe();
    }
  }

  updateMessages(): void {
    if (this.selectedGroup) {
      this.apiService.getMessages(this.selectedGroup.groupId).subscribe({
        next: (messages) => {
          this.messages = messages;
        },
      });
    } else {
      this.messages = null;
    }
  }
}
