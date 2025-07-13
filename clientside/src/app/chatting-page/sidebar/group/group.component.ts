import {Component, Input, OnInit} from '@angular/core';
import {GroupDto} from "../../../dto/group.dto";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  group:GroupDto = {name:"",description:"", groupId:""};
}
