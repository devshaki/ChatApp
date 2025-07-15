import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GroupDto } from '../../dto/group.dto';
import { ApiService } from 'src/app/api.service';
import { MessageDto } from 'src/app/dto/message.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  groups: GroupDto[] = [];
  contacts: string[] = [];
  currentView: string = 'Groups';

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadGroups();
    this.loadContacts();
  }

  loadGroups() {
    this.apiService.getGroups().subscribe((groups: GroupDto[]) => {
      this.groups = groups;
    });
  }

  loadContacts() {
    this.apiService.getUserContacts().subscribe((contacts: string[]) => {
      this.contacts = contacts;
    });
  }

  onToggleSelected(toggleValue: string) {
    this.currentView = toggleValue;
    if (toggleValue === 'Groups') {
      this.loadGroups();
    } else if (toggleValue === 'Contacts') {
      this.loadContacts();
    }
  }

  @Output()
  groupSelected: EventEmitter<GroupDto> = new EventEmitter<GroupDto>();

  @Output()
  contactSelected: EventEmitter<string> = new EventEmitter<string>();
  selectGroup(group: GroupDto) {
    this.groupSelected.emit(group);
  }
  selectContact(contact: string) {
    this.contactSelected.emit(contact);
  }
}
