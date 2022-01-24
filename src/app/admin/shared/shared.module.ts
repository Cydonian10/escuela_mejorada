import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from '@material/material.module';
import { RouterModule } from '@angular/router';


@NgModule( {
  declarations: [ NavBarComponent ],
  imports: [
    CommonModule,
    LayoutModule,
    MaterialModule,
    RouterModule
  ],
  exports: [ NavBarComponent ]
} )
export class SharedModule { }
