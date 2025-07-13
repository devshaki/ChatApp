import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDto} from "./dto/user.dto";
import { GroupDto } from './dto/group.dto';
import { MessageDto } from './dto/message.dto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'http://localhost:3000';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) {}
  public login(credentials: UserDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials, {
      withCredentials: true
    });
  }

  public signup(credentials: UserDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/signup`, credentials, {
      withCredentials: true
    });
  }

  public getGroups(): Observable<GroupDto[]> {
    return this.http.get<GroupDto[]>(`${this.apiUrl}/chat/groups`, {
      headers: this.headers,
      withCredentials: true
    });
  }

  public addGroup(group: GroupDto, username: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/chat/group`, { groupDto: group, username: username }, {
      withCredentials: true
    });
  }

  public addMessage(message: MessageDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/chat/$messages`, { body: message }, {
      headers: this.headers,
      withCredentials: true
    });
  }

}
