import { Component, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-addContact',
  templateUrl: './addContact.component.html',
  styleUrls: ['./addContact.component.scss'],
})
export class AddContactComponent implements OnInit {
  inputControl = new FormControl('');
  users: string[] = [];

  constructor(private readonly apiService: ApiService) {}

  public ngOnInit(): void {
    this.updateContacts();
  }

  public updateContacts(): void {
    this.apiService.getUsers().subscribe((users: string[]) => {
      this.users = users;
    });
  }

  public onAddMember(username: string): void {
    this.apiService.addContact(username).subscribe({
      next: () => {
        this.inputControl.setValue('');
        console.log(`Contact ${username} added successfully.`);
      },
    });
  }
}
