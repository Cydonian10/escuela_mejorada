import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LinkComponent } from './components/link/link.component';
import { ButtonTramiteComponent } from './components/button-tramite/button-tramite.component';
import { TituloComponent } from './components/titulo/titulo.component';
import { RouterModule } from '@angular/router';
import { LabelComponent } from './components/label/label.component';
import { ButtonComponent } from './components/button/button.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { LinkNavigateComponent } from './components/link-navigate/link-navigate.component';



@NgModule( {
  declarations: [
    NavBarComponent,
    LinkComponent,
    ButtonTramiteComponent,
    TituloComponent,
    LabelComponent,
    ButtonComponent,
    ErrorMessageComponent,
    LinkNavigateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavBarComponent,
    ButtonTramiteComponent,
    TituloComponent,
    LabelComponent,
    ButtonComponent,
    ErrorMessageComponent,
    LinkNavigateComponent
  ]
} )
export class SharedModule { }
