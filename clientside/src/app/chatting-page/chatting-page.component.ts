import { Component, OnInit } from '@angular/core';
import { GroupDto } from '../dto/group.dto';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { OnlineUsersService } from '../OnlineUsersService.service';

@Component({
  selector: 'app-chatting-page',
  templateUrl: './chatting-page.component.html',
  styleUrls: ['./chatting-page.component.scss'],
})
export class ChattingPageComponent implements OnInit {
  selectedGroup: GroupDto | null = null;

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router,
    private readonly onlineUsersService: OnlineUsersService
  ) {}

  public ngOnInit(): void {}

  public onGroupSelected(group: GroupDto): void {
    console.log('Selected group:', group);
    this.selectedGroup = group;
    this.router.navigate([`/chat/${group.groupId}`]);
  }
  public onContactSelected(contact: string): void {
    console.log('Selected contact:', contact);
    this.apiService.getDm(contact).subscribe({
      next: (group: GroupDto) => {
        const DMgroup = group;
        group.name = contact;
        this.selectedGroup = group;
        this.router.navigate([`/chat/${group.groupId}`]);
      },
    });
  }
}
