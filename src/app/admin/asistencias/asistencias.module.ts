import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsistenciasRoutingModule } from './asistencias-routing.module';
import { AsistenciaComponent } from './pages/asistencia/asistencia.component';
import { MaterialModule } from '@material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { SalidaComponent } from './pages/salida/salida.component';
import { MarcarSalidaComponent } from './components/marcar-salida/marcar-salida.component';
import { BorrarAsistenciasComponent } from './components/borrar-asistencias/borrar-asistencias.component';


@NgModule( {
  declarations: [
    AsistenciaComponent,
    SalidaComponent,
    MarcarSalidaComponent,
    BorrarAsistenciasComponent
  ],
  imports: [
    CommonModule,
    AsistenciasRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule
  ]
} )
export class AsistenciasModule { }
