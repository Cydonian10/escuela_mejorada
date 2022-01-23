import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfesoresComponent } from './pages/profesores/profesores.component';
import { TramitesComponent } from './pages/tramites/tramites.component';

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "profesores",
    component: ProfesoresComponent
  },
  {
    path: "tramites",
    component: TramitesComponent
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class PrincipalRoutingModule { }
