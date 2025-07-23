import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
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
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('scroll') private chatMessages!: ElementRef;

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
      const previousCount = this.messages.length;
      this.messages = messages;
      
      // If we have new messages (array got longer), scroll to bottom after animation
      if (messages.length > previousCount) {
        // Wait 300ms to let the flying animation be visible, then scroll
        setTimeout(() => {
          this.scrollToBottom();
        }, 300);
      }
    });

    this.route.paramMap.subscribe((params) => {
      const chatId = params.get('id');
      if (chatId) {
        this.messageService.loadChat(chatId);
      }
    });
  }

  public ngAfterViewInit(): void {
    // Scroll to bottom after view is initialized
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }
  private scrollToBottom(): void {
    try {
      // Smooth scroll to bottom to follow the flying message
      this.chatMessages.nativeElement.scrollTo({
        top: this.chatMessages.nativeElement.scrollHeight,
        behavior: 'smooth'
      });
    } catch (err) {
      // Fallback for browsers that don't support smooth scroll
      this.chatMessages.nativeElement.scrollTop =
        this.chatMessages.nativeElement.scrollHeight;
    }
  }
  public sendMessage() {
    this.selectedGroup$.pipe(take(1)).subscribe((group) => {
      if (group) {
        const message: MessageDto = {
          chatId: group.groupId,
          body: this.messageInput,
        };
        this.messageService.sendMessage(message);
        // Clear input immediately for better UX
        this.messageInput = '';
        // Wait a bit for the message to be added, then scroll
        setTimeout(() => {
          this.scrollToBottom();
        }, 100);
      }
    });
  }

  public onEditGroup(group: GroupDto | null): void {
    console.log('Editing group:', group);
    if (group) {
      console.log('Editing group:', group);
      this.router.navigate(['/group-editor' + `/${group.groupId}`]);
    }
  }
  public ngOnDestroy(): void {
    if (this.messageSub) {
      this.messageSub.unsubscribe();
    }
  }
}
