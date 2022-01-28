import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsistenciaComponent } from './pages/asistencia/asistencia.component';
import { SalidaComponent } from './pages/salida/salida.component';

const routes: Routes = [
  {
    path: "",
    component: AsistenciaComponent
  },
  {
    path: "salida",
    component: SalidaComponent
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class AsistenciasRoutingModule { }
