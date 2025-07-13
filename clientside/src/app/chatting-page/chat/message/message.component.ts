import { Component, Input, OnInit } from '@angular/core';
import {MessageDto} from "../../../dto/message.dto";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  @Input() message: MessageDto = {body:"template message", chatId:"", createdAt:new Date};

  constructor() { }

  ngOnInit(): void {
  }

}
