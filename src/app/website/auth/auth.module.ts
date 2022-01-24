import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginMedicoComponent } from './pages/login-medico/login-medico.component';
import { LayoutAuthComponent } from './components/layout-auth/layout-auth.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LoginMedicoComponent,
    LayoutAuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
