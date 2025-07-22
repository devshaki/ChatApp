import { Injectable } from '@angular/core';
import { SocketIoService } from '../socket-io.service';
import { MessageDto } from '../dto/message.dto';
import { ChatComponent } from '../chatting-page/chat/chat.component';
import { ApiService } from '../api.service';
import { GroupDto } from '../dto/group.dto';
import { CookieService } from 'ngx-cookie-service';
import { ChatStateService } from './chat-state.service';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private messageSub: any;
  constructor(
    private readonly socketioService: SocketIoService,
    private readonly apiService: ApiService,
    private readonly cookieService: CookieService,
    private readonly chatStateService: ChatStateService
  ) {
    this.initSocketListener();
  }

  private initSocketListener(): void {
    this.messageSub = this.socketioService.message$.subscribe(
      (message: MessageDto) => {
        if (
          this.chatStateService.selectedGroup$.value &&
          message.chatId === this.chatStateService.selectedGroup$.value.groupId
        ) {
          this.chatStateService.messages$.next([
            ...(this.chatStateService.messages$.value || []),
            message,
          ]);
        }
      }
    );
  }

  public loadChat(chatId: string) {
    this.apiService.getGroup(chatId).subscribe({
      next: (group: GroupDto) => {
        this.chatStateService.messages$.next([]);
        this.chatStateService.selectedGroup$.next(group);
        if (group.isDm) {
          this.apiService.getMembersInGroup(chatId).subscribe({
            next: (members: string[]) => {
              const currentUsername = this.cookieService.get('username');
              const contactName = members.find(
                (member) => member !== currentUsername
              );
              if (contactName && this.chatStateService.selectedGroup$.value) {
                this.chatStateService.selectedGroup$.value.name = contactName;
              }
            },
          });
        }

        this.updateMessages();
      },
    });
  }

  private updateMessages(): void {
    if (this.chatStateService.selectedGroup$.value) {
      this.apiService
        .getMessages(this.chatStateService.selectedGroup$.value.groupId)
        .subscribe({
          next: (messages) => {
            this.chatStateService.messages$.next(messages);
          },
        });
    } else {
      this.chatStateService.messages$.next([]);
    }
  }

  public sendMessage(message: MessageDto): void {
    if (this.chatStateService.selectedGroup$.value) {
      message.chatId = this.chatStateService.selectedGroup$.value.groupId;
      this.socketioService.sendMessage(message);
    }
  }
}
