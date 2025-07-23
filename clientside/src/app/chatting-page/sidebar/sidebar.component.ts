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
  search: string = '';
  groups: GroupDto[] = [];
  contacts: string[] = [];
  currentView: string = 'Groups';

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.loadGroups();
    this.loadContacts();
  }

  public loadGroups() {
    this.apiService.getGroups().subscribe((groups: GroupDto[]) => {
      this.groups = groups;
    });
  }

  public loadContacts() {
    this.apiService.getUserContacts().subscribe((contacts: string[]) => {
      this.contacts = contacts;
    });
  }

  public onToggleSelected(toggleValue: string) {
    this.currentView = toggleValue;
    if (toggleValue === 'Groups') {
      this.loadGroups();
    } else if (toggleValue === 'Dms') {
      this.loadContacts();
    }
  }

  public deleteDm(contact: string) {
    console.log('Deleting DM with:', contact);
    this.apiService.deleteDm(contact).subscribe({
      next: () => {
        console.log('DM deleted successfully');
        this.loadContacts();
        this.router.navigate(['/chat']);
      },
      error: (err) => {
        console.error('Failed to delete DM:', err);
      },
    });
  }

  @Output()
  groupSelected: EventEmitter<GroupDto> = new EventEmitter<GroupDto>();

  @Output()
  contactSelected: EventEmitter<string> = new EventEmitter<string>();
  public selectGroup(group: GroupDto) {
    this.groupSelected.emit(group);
  }
  public selectContact(contact: string) {
    this.contactSelected.emit(contact);
  }
}
