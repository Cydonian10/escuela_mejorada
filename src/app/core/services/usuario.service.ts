import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IRespUsuarios } from '@core/models/usuario.model';
import { IUsuario } from '../models/usuario.model';

@Injectable( {
  providedIn: 'root'
} )
export class UsuarioService {

  private url: string = environment.urlBase;
  private usuariosStore$ = new BehaviorSubject<IUsuario[]>( [] );

  get usuariosStore () {
    return this.usuariosStore$.asObservable();
  }

  constructor(
    private http: HttpClient
  ) { }

  findAll () {
    if ( this.usuariosStore$.value.length === 0 ) {
      this.http.get<IRespUsuarios>( `${ this.url }/api/users` ).subscribe(
        ( resp ) => {
          this.usuariosStore$.next( [ ...this.usuariosStore$.value, ...resp.data ] );
        }
      );
    }
  }

}
