import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { MessageDto } from '../../../dto/message.dto';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, OnChanges {
  @Input() message: MessageDto = {
    body: 'template message',
    chatId: '',
    createdAt: new Date(),
  };

  public isNewMessage = false;

  constructor() {}

  public ngOnInit(): void {
    // Check if this message is less than 3 seconds old (new message)
    if (this.message.createdAt) {
      const messageTime = new Date(this.message.createdAt).getTime();
      const now = new Date().getTime();
      const timeDiff = now - messageTime;
      
      // If message is less than 3 seconds old, treat it as new
      this.isNewMessage = timeDiff < 3000;
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['message'] && changes['message'].currentValue) {
      // When message input changes, check if it's a new message
      if (this.message.createdAt) {
        const messageTime = new Date(this.message.createdAt).getTime();
        const now = new Date().getTime();
        const timeDiff = now - messageTime;
        
        this.isNewMessage = timeDiff < 3000;
      }
    }
  }
}
