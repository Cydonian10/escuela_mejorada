import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { MaterialModule } from '../../material/material.module';
import { CrearUsuarioComponent } from './pages/crear-usuario/crear-usuario.component';
import { SharedModule } from '@shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { AsistenciasByUserComponent } from './pages/asistencias-by-user/asistencias-by-user.component';


@NgModule( {
  declarations: [
    UsuariosComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    DeleteUserComponent,
    AsistenciasByUserComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
} )
export class UsuariosModule { }
