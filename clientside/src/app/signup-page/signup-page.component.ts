import { Component, OnInit } from '@angular/core';
import {UserDto} from "../dto/user.dto";
import {ApiService} from "../api.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  constructor(private readonly apiService:ApiService, private readonly cookiesService:CookieService, private readonly router:Router) { }

  ngOnInit(): void {
  }
  hide = true;
  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }
  onSubmit() {
    const credentials: UserDto = {
      username: (document.getElementById('username') as HTMLInputElement).value,
      password: (document.getElementById('password') as HTMLInputElement).value
    };
    if (!credentials.username || !credentials.password) {
      return;
    }
    this.apiService.signup(credentials).subscribe({
      next: (response: any) => {
        if (response && response.clientId) {
          this.cookiesService.set('username', credentials.username);
          this.router.navigate(['/chat']);
        }
      },
    })
  }

}
