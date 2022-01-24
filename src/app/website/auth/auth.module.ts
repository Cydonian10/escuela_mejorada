import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LayoutAuthComponent } from './components/layout-auth/layout-auth.component';
import { SharedModule } from '@shared/shared.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule( {
  declarations: [
    LoginComponent,
    RegisterComponent,
    LayoutAuthComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
} )
export class AuthModule { }
