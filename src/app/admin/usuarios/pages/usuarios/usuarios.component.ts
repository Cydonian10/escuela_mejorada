import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsuarioService } from '@core/services/usuario.service';
import { Subscription } from 'rxjs';
import { IUsuario } from '@core/models/usuario.model';

@Component( {
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: [ './usuarios.component.scss' ]
} )
export class UsuariosComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  public usuarios: IUsuario[] = [];

  constructor(
    private usuarioService: UsuarioService
  ) {
    this.usuarioService.findAll();
  }

  ngOnInit (): void {
    this.findAll();
  }

  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  }

  //! ** Trear los usuarios **
  findAll () {
    this.subscription.add(
      this.usuarioService.usuariosStore.subscribe( resp => {
        this.usuarios = resp;
      } )
    );
  }
}
