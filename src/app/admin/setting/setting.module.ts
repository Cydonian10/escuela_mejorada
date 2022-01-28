import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { SettingsComponent } from './pages/settings/settings.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule( {
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
} )
export class SettingModule { }
