import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { GroupDto } from '../../dto/group.dto';
import { MessageDto } from 'src/app/dto/message.dto';
import { ApiService } from 'src/app/api.service';
import { SocketIoService } from 'src/app/socket-io.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  selectedGroup: GroupDto | null = null;
  @Input() set SelectedGroup(group: GroupDto | null) {
    this.selectedGroup = group;
    this.updateMessages();
  }

  messages: MessageDto[] | null = null;

  messageInput: string = '';

  constructor(
    private readonly apiService: ApiService,
    private readonly socketioService: SocketIoService,
    private readonly router: Router
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
