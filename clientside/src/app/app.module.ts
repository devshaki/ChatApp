import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { ChattingPageComponent } from './chatting-page/chatting-page.component';
import { ChatComponent } from './chatting-page/chat/chat.component';
import { SidebarComponent } from './chatting-page/sidebar/sidebar.component';
import { GroupComponent } from './chatting-page/sidebar/group/group.component';
import { MessageComponent } from './chatting-page/chat/message/message.component';
import { TopbarComponent } from './chatting-page/chat/topbar/topbar.component';
import { ButtombarComponent } from './chatting-page/sidebar/buttombar/buttombar.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NewGroupPageComponent } from './new-group-page/new-group-page.component';
import { GroupEditorPageComponent } from './group-editor-page/group-editor-page.component';
import { MemberComponent } from './group-editor-page/member/member.component';
import { AddContactComponent } from './chatting-page/sidebar/addContact/addContact.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignupPageComponent,
    ChattingPageComponent,
    ChatComponent,
    SidebarComponent,
    GroupComponent,
    MessageComponent,
    TopbarComponent,
    ButtombarComponent,
    NewGroupPageComponent,
    GroupEditorPageComponent,
    MemberComponent,
    AddContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatListModule,
    MatAutocompleteModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
