import { Component, OnInit } from '@angular/core';
import { GroupDto } from '../dto/group.dto';

@Component({
  selector: 'app-chatting-page',
  templateUrl: './chatting-page.component.html',
  styleUrls: ['./chatting-page.component.scss']
})
export class ChattingPageComponent implements OnInit {
  selectedGroup: GroupDto | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  onGroupSelected(group: GroupDto): void {
    console.log('Selected group:', group);
    
    this.selectedGroup = group;
  }
}
