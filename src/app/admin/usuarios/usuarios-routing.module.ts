import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { CrearUsuarioComponent } from './pages/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';
import { AsistenciasByUserComponent } from './pages/asistencias-by-user/asistencias-by-user.component';

const routes: Routes = [
  {
    path: "",
    component: UsuariosComponent
  },
  {
    path: "crear-usuario",
    component: CrearUsuarioComponent
  },
  {
    path: ":id",
    component: EditarUsuarioComponent
  },
  {
    path: "asistencias/:id",
    component: AsistenciasByUserComponent
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class UsuariosRoutingModule { }
