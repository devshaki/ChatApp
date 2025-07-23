import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-buttombar',
  templateUrl: './buttombar.component.html',
  styleUrls: ['./buttombar.component.scss'],
})
export class ButtombarComponent implements OnInit {
  selectedToggle: string | null = 'Groups';

  @Output() toggleSelected = new EventEmitter<string>();

  constructor(
    private readonly router: Router,
    private readonly cookiesService: CookieService
  ) {}

  public ngOnInit(): void {}

  public onToggleChange(value: string) {
    this.selectedToggle = value;
    this.toggleSelected.emit(value);
  }

  public onNewGroupClick() {
    this.router.navigate(['/new-group']);
  }

  public onLogOut() {
    this.cookiesService.delete('username', '/');
    this.router.navigate(['/login']);
  }
}
