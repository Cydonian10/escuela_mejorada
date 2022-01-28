import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TramitesComponent } from './pages/tramites/tramites.component';
import { EditarTramiteComponent } from './pages/editar-tramite/editar-tramite.component';

const routes: Routes = [
  {
    path: "",
    component: TramitesComponent
  },
  {
    path: ":id",
    component: EditarTramiteComponent
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class TramitesRoutingModule { }
