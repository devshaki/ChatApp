import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { GroupDto } from '../../dto/group.dto';
import { MessageDto } from 'src/app/dto/message.dto';
import { ApiService } from 'src/app/api.service';
import { SocketIoService } from 'src/app/socket-io.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, take } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ChatStateService } from 'src/app/services/chat-state.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  // @Input() set SelectedGroup(group: GroupDto | null) {
  //   this.selectedGroup = group;
  // }

  selectedGroup: GroupDto | null = null;
  messages: MessageDto[] = [];

  selectedGroup$ = this.chatState.selectedGroup$;
  messages$ = this.chatState.messages$;

  messageInput: string = '';

  constructor(
    private readonly apiService: ApiService,
    private readonly socketioService: SocketIoService,
    private readonly router: Router,
    private readonly cookieService: CookieService,
    private readonly chatState: ChatStateService,
    private readonly messageService: MessageService,
    private readonly route: ActivatedRoute
  ) {}

  private messageSub: any;

  public ngOnInit(): void {
    this.chatState.selectedGroup$.subscribe((group) => {
      this.selectedGroup = group;
    });

    this.chatState.messages$.subscribe((messages) => {
      this.messages = messages;
    });

    this.route.paramMap.subscribe((params) => {
      const chatId = params.get('id');
      if (chatId) {
        this.messageService.loadChat(chatId);
      }
    });
  }

  public sendMessage() {
    this.selectedGroup$.pipe(take(1)).subscribe((group) => {
      if (group) {
        const message: MessageDto = {
          chatId: group.groupId,
          body: this.messageInput,
        };
        this.messageService.sendMessage(message);
        this.messageInput = '';
      }
    });
  }

  public onEditGroup(group: GroupDto | null): void {
    if (group) {
      this.router.navigate(['/group-editor'], {
        state: { group },
      });
    }
  }
  public ngOnDestroy(): void {
    if (this.messageSub) {
      this.messageSub.unsubscribe();
    }
  }
}
