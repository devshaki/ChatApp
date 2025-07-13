import { Component, Input, OnInit, Output } from '@angular/core';
import { GroupDto } from '../../dto/group.dto';
import { MessageDto } from 'src/app/dto/message.dto';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() selectedGroup: GroupDto | null = null;

  messages: MessageDto[] | null = null;

  messageInput: string = '';
  constructor(private readonly apiService:ApiService) { }

  sendMessage(){
    if (!this.selectedGroup) {
      return;
    }
    const newMessage: MessageDto = {
      chatId: this.selectedGroup.groupId,
      body: this.messageInput,
    };
    

    this.messageInput = '';
  }
  ngOnInit(): void {
  }
}
