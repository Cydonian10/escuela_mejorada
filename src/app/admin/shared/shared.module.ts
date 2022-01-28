import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '@material/material.module';
import { RouterModule } from '@angular/router';
import { SharedModule as Shared } from '@shared/shared.module';
import { LinkAdminComponent } from './layout/link-admin/link-admin.component';
import { AlertComponent } from './components/alert/alert.component';
;


@NgModule( {
  declarations: [ NavBarComponent, LinkAdminComponent, AlertComponent ],
  imports: [
    CommonModule,
    LayoutModule,
    MaterialModule,
    RouterModule,
    Shared
  ],
  exports: [
    NavBarComponent,
    LinkAdminComponent,
    AlertComponent
  ]
} )
export class SharedModule { }
