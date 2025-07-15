import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from './dto/user.dto';
import { GroupDto } from './dto/group.dto';
import { MessageDto } from './dto/message.dto';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly apiUrl = 'http://localhost:3000';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}
  public login(credentials: UserDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials, {
      withCredentials: true,
    });
  }

  public signup(credentials: UserDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/signup`, credentials, {
      withCredentials: true,
    });
  }

  public getGroups(): Observable<GroupDto[]> {
    return this.http.get<GroupDto[]>(`${this.apiUrl}/chat/groups`, {
      headers: this.headers,
      withCredentials: true,
    });
  }

  public addGroup(group: GroupDto): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/chat/group`, group, {
      withCredentials: true,
      responseType: 'text' as 'json',
    });
  }

  public addMessage(message: MessageDto): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/chat/$messages`,
      { body: message },
      {
        headers: this.headers,
        withCredentials: true,
      }
    );
  }

  public getMessages(groupId: string): Observable<MessageDto[]> {
    return this.http.get<MessageDto[]>(
      `${this.apiUrl}/chat/${groupId}/messages`,
      {
        headers: this.headers,
        withCredentials: true,
      }
    );
  }

  public addUserToGroup(groupId: string, username: string) {
    return this.http.put<void>(
      `${this.apiUrl}/chat/add/${groupId}/${username}`,
      {},
      {
        headers: this.headers,
        withCredentials: true,
      }
    );
  }

  public removeUserToGroup(groupId: string, username: string) {
    console.log(`Removing user ${username} from group ${groupId}`);
    return this.http.put<void>(
      `${this.apiUrl}/chat/remove/${groupId}/${username}`,
      {},
      {
        headers: this.headers,
        withCredentials: true,
      }
    );
  }

  public getMembersInGroup(groupId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/chat/${groupId}/members`, {
      headers: this.headers,
      withCredentials: true,
    });
  }

  public getUserContacts(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/chat/contacts`, {
      headers: this.headers,
      withCredentials: true,
    });
  }

  public addContact(username: string): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/chat/add-contact/${username}`,
      {},
      {
        headers: this.headers,
        withCredentials: true,
      }
    );
  }
  public getUsers(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/chat/usernames`, {
      headers: this.headers,
      withCredentials: true,
    });
  }

  public getDm(friendname: string): Observable<GroupDto> {
    return this.http.get<GroupDto>(`${this.apiUrl}/chat/dm/${friendname}`, {
      headers: this.headers,
      withCredentials: true,
    });
  }
}
