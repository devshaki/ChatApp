import { Component, OnInit } from '@angular/core';
import { GroupDto } from '../dto/group.dto';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-group-editor-page',
  templateUrl: './group-editor-page.component.html',
  styleUrls: ['./group-editor-page.component.scss'],
})
export class GroupEditorPageComponent implements OnInit {
  group: GroupDto | null = null;
  myControl = new FormControl();

  members: string[] = ['Alice', 'Bob', 'Charlie'];
  contacts: string[] = ['Dave', 'Eve', 'Frank'];

  constructor(
    private readonly router: Router,
    private readonly apiService: ApiService
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();

    if (navigation?.extras.state?.['group']) {
      this.group = navigation.extras.state['group'] as GroupDto;
    } else {
      const state = history.state;
      if (state && state.group) {
        this.group = state.group as GroupDto;
      } else {
        return;
      }
    }

    if (this.group) {
      this.loadMembers();
      this.apiService.getUserContacts().subscribe((contacts: string[]) => {
        this.contacts = contacts;
      });
    }
  }

  onKickMember(member: string): void {
    if (this.group?.groupId) {
      this.apiService.removeUserToGroup(this.group.groupId, member).subscribe({
        next: () => {
          console.log('Kicking user:', member);

          this.loadMembers();
        },
      });
    }
  }

  onAddMember(member: string): void {
    console.log('Adding member:', member, 'to group:', this.group?.groupId);
    if (this.group?.groupId && member.trim()) {
      this.apiService.addUserToGroup(this.group.groupId, member).subscribe({
        next: () => {
          this.loadMembers();
        },
      });
    }
  }

  private loadMembers(): void {
    if (this.group?.groupId) {
      this.apiService.getMembersInGroup(this.group.groupId).subscribe({
        next: (members: string[]) => {
          this.members = members;
        },
      });
    }
  }
}
