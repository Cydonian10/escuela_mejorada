import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUsuario } from '@core/models/usuario.model';
import { UsuarioService } from '@core/services/usuario.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component( {
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: [ './profesores.component.scss' ]
} )
export class ProfesoresComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

  public profesores: IUsuario[] = [];

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit (): void {
    this.usuarioService.findAll();
    this.getProfesores();
  }
  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  }


  getProfesores () {
    this.subscription.add(
      this.usuarioService.usuariosStore
        .pipe(
          map( ( resp ) => resp.filter( item => item.rol !== 'admin' ) )
        )
        .subscribe(
          {
            next: ( resp ) => {
              this.profesores = resp;
            }
          }
        )
    );
  }
}
