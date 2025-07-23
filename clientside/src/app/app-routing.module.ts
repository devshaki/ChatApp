import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { ChattingPageComponent } from './chatting-page/chatting-page.component';
import { NewGroupPageComponent } from './new-group-page/new-group-page.component';
import { GroupEditorPageComponent } from './group-editor-page/group-editor-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: SignupPageComponent,
  },
  {
    path: 'chat/:id',
    component: ChattingPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'chat',
    component: ChattingPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dm/:id',
    component: ChattingPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dm',
    component: ChattingPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'new-group',
    component: NewGroupPageComponent,
  },
  {
    path: 'group-editor',
    component: GroupEditorPageComponent,
  },
  {
    path: 'group-editor/:id',
    component: GroupEditorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
