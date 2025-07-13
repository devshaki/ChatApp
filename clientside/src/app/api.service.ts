import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "./dto/user.dto";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'http://localhost:3000';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}
  public login(credentials: UserDto): Observable<JSON> {
      return this.http.post<JSON>(`${this.apiUrl}/auth/login`, credentials);
    }

  public signup(credentials: UserDto): Observable<string> {
      return this.http.post(`${this.apiUrl}/auth/signup`, credentials,{
        responseType: 'text'});
  }

}
