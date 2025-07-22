import { Component, OnInit } from '@angular/core';
import { OnlineUsersService } from './OnlineUsersService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'clientside';

  public ngOnInit(): void {}
}
