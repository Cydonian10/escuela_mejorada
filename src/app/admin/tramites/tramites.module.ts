import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TramitesRoutingModule } from './tramites-routing.module';
import { TramitesComponent } from './pages/tramites/tramites.component';
import { MaterialModule } from '@material/material.module';
import { EditarTramiteComponent } from './pages/editar-tramite/editar-tramite.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { SharedModule as Shared } from '@admin/shared/shared.module';
import { ConfirmDeleteComponent } from './components/confirm-delete/confirm-delete.component';



@NgModule( {
  declarations: [
    TramitesComponent,
    EditarTramiteComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    CommonModule,
    TramitesRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    Shared,
    MaterialModule
  ]
} )
export class TramitesModule { }
