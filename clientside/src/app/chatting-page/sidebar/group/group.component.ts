import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GroupDto } from '../../../dto/group.dto';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  @Input()
  group: GroupDto = { name: '', description: '', groupId: '' };

  @Output()
  onOpenGroup: EventEmitter<GroupDto> = new EventEmitter<GroupDto>();

  constructor() {}

  public ngOnInit(): void {}

  public onClickGroup() {
    this.onOpenGroup.emit(this.group);
  }
}
