import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {GroupDto} from "../../dto/group.dto";
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  groups: GroupDto[] = [];

  constructor(private readonly apiService:ApiService) {
   }

  ngOnInit(): void {
    this.apiService.getGroups().subscribe((groups: GroupDto[]) => {
      this.groups = groups;
    });
  }

  @Output()
  groupSelected: EventEmitter<GroupDto> = new EventEmitter<GroupDto>();

  selectGroup(group:GroupDto){
    this.groupSelected.emit(group);
  }
}


