import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OnlineUsersService } from 'src/app/OnlineUsersService.service';

@Component({
  selector: 'app-dm',
  templateUrl: './dm.component.html',
  styleUrls: ['./dm.component.scss'],
})
export class DmComponent implements OnInit {
  @Input()
  contactName: string = '';

  isOnline: boolean = false;

  @Output()
  onOpenDm: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onDeleteDm: EventEmitter<string> = new EventEmitter<string>();

  constructor(private onlineUsersService: OnlineUsersService) {}

  public ngOnInit(): void {
    this.onlineUsersService.onlineUsers$.subscribe((onlineUsers) => {
      this.isOnline = onlineUsers.includes(this.contactName);
    });
  }

  public onClickDm() {
    console.log('Opening DM with:', this.contactName);
    this.onOpenDm.emit(this.contactName);
  }
  public deleteDm() {
    this.onDeleteDm.emit(this.contactName);
  }
}
