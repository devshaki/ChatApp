import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GroupDto } from 'src/app/dto/group.dto';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  @Input() group: GroupDto | null = null;

  @Output()
  onEditGroup: EventEmitter<GroupDto | null> =
    new EventEmitter<GroupDto | null>();
  constructor() {}

  editGroup() {
    this.onEditGroup.emit(this.group || null);
  }
  ngOnInit(): void {}
}
