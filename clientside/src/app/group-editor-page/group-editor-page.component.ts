import { Component, OnInit } from '@angular/core';
import { GroupDto } from '../dto/group.dto';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl } from '@angular/forms';
import { SocketIoService } from '../socket-io.service';

@Component({
  selector: 'app-group-editor-page',
  templateUrl: './group-editor-page.component.html',
  styleUrls: ['./group-editor-page.component.scss'],
})
export class GroupEditorPageComponent implements OnInit {
  group: GroupDto | null = null;
  myControl = new FormControl();

  members: string[] = [];
  contacts: string[] = [];

  constructor(
    private readonly router: Router,
    private readonly socketIoService: SocketIoService,
    private readonly apiService: ApiService
  ) {}

  public ngOnInit(): void {
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

  public onKickMember(member: string): void {
    if (this.group?.groupId) {
      this.socketIoService.kickMember(this.group.groupId, member);
      this.loadMembers();
    }
  }

  public onAddMember(member: string): void {
    if (this.group?.groupId && member.trim()) {
      console.log(member);
      this.socketIoService.addMember(this.group.groupId, member);
      this.loadMembers();
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
