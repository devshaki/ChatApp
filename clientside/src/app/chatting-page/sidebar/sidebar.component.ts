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

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    console.log('Sidebar component initializing...');
    this.apiService.getGroups().subscribe({
      next: (groups: GroupDto[]) => {
        console.log('Groups loaded:', groups);
        this.groups = groups;
      },
      error: (error) => {
        console.error('Error loading groups:', error);
      }
    });
  }

  @Output()
  groupSelected: EventEmitter<GroupDto> = new EventEmitter<GroupDto>();

  selectGroup(group: GroupDto) {
    console.log('Sidebar selectGroup called with:', group);
    this.groupSelected.emit(group);
  }
  onEditGroup(group: GroupDto): void {
    this.router.navigate(['/group-editor'], { state: { group } });
  }
}
