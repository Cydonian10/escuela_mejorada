import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavBarComponent } from './shared/layout/nav-bar/nav-bar.component';
;

const routes: Routes = [
  {
    path: "admin",
    component: NavBarComponent,
    children: [
      {
        path: "",
        loadChildren: () => import( "./usuarios/usuarios.module" ).then( m => m.UsuariosModule )
      }
    ]
  },
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class AdminRoutingModule { }
