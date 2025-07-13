import { Component, OnInit } from '@angular/core';
import {UserDto} from "../dto/user.dto";
import {ApiService} from "../api.service";
import {CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

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
    this.apiService.login(credentials).subscribe({
      next: (response: any) => {
        console.log('Login response:', response);
        if (response && response.clientId) {
          this.cookiesService.set('username', credentials.username);
          this.router.navigate(['/chat']);
        }
      },
    })
  }

}
