import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import { GroupDto } from '../dto/group.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-group-page',
  templateUrl: './new-group-page.component.html',
  styleUrls: ['./new-group-page.component.scss'],
})
export class NewGroupPageComponent implements OnInit {
  groupName: string = '';
  groupDesc: string = '';

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const groupName = this.groupName.trim();
    const groupDesc = this.groupDesc.trim();
    if (!groupName) return;
    console.log('Creating group:', { groupName, groupDesc });
    const group: GroupDto = {
      name: groupName,
      description: groupDesc,
      groupId: '',
    };
    this.apiService.addGroup(group).subscribe({
      next: (res) => {
        this.router.navigate(['/chat']);
      },
    });
  }
}
