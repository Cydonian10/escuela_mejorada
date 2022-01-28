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
        path: "usuarios",
        loadChildren: () => import( "./usuarios/usuarios.module" ).then( m => m.UsuariosModule )
      },
      {
        path: "tramites",
        loadChildren: () => import( "./tramites/tramites.module" ).then( m => m.TramitesModule )
      },
      {
        path: "configuracion",
        loadChildren: () => import( "./setting/setting.module" ).then( m => m.SettingModule )
      },
      {
        path: "posts",
        loadChildren: () => import( "./post/post.module" ).then( m => m.PostModule )
      },
      {
        path: "asistencias",
        loadChildren: () => import( "./asistencias/asistencias.module" ).then( m => m.AsistenciasModule )
      }
    ]
  },
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class AdminRoutingModule { }
