import { Injectable } from '@angular/core';
import { MessageDto } from '../dto/message.dto';
import { BehaviorSubject } from 'rxjs';
import { GroupDto } from '../dto/group.dto';

@Injectable({
  providedIn: 'root',
})
export class ChatStateService {
  public selectedGroup$ = new BehaviorSubject<GroupDto | null>(null);
  public messages$ = new BehaviorSubject<MessageDto[]>([]);

  constructor() {}

  public setSelectedGroup(group: GroupDto | null) {
    this.selectedGroup$.next(group);
  }

  public setMessages(messages: MessageDto[]) {
    this.messages$.next(messages);
  }

  public addMessage(message: MessageDto) {
    const current = this.messages$.value;
    this.messages$.next([...current, message]);
  }
}
