import { Component, OnInit } from '@angular/core';
import {GroupDto} from "../../dto/group.dto";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  groups: GroupDto[] = [
    { name: 'General', description: 'General chat group' },
    { name: 'Developers', description: 'Developers discussion' },
    { name: 'Random', description: 'Random topics' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  selectGroup(group:GroupDto){

  }
}
