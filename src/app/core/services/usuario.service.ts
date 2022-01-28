import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateUsuarioDto, IRespUsuarios, IUsuario, IRespUsuario, UpdateUsuarioDto } from '@core/models/usuario.model';

@Injectable( {
  providedIn: 'root'
} )
export class UsuarioService {

  private url: string = environment.urlBase;
  private usuariosStore$ = new BehaviorSubject<IUsuario[]>( [] );
  public user$ = new BehaviorSubject<IUsuario>( {} as IUsuario );

  get usuariosStore () {
    return this.usuariosStore$.asObservable();
  }

  setUser ( data: IUsuario ) {
    this.user$.next( data );
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

  userByEmail ( email: string ) {
    return this.http.get<IRespUsuario>( `${ this.url }/api/users/email/${ email }` );
  }

  one ( id: number ) {
    return this.http.get<IRespUsuario>( `${ this.url }/api/users/${ id }` );
  }

  create ( data: CreateUsuarioDto ) {
    return this.http.post<IRespUsuario>( `${ this.url }/api/register`, data ).pipe(
      tap( resp => this.storeCreate( resp.data ) )
    );
  };

  update ( changes: UpdateUsuarioDto, id: number ) {
    return this.http.put<IRespUsuario>( `${ this.url }/api/users/${ id }`, changes ).pipe(
      tap( resp => this.storeUpdate( resp.data, id ) )
    );
  }

  remove ( id: number ) {
    return this.http.delete<IRespUsuario>( `${ this.url }/api/users/${ id }` ).pipe(
      tap( () => this.storeDelete( id ) )
    );
  }


  //! ** Store Usurios **

  private storeCreate ( usuario: IUsuario ) {
    this.usuariosStore$.next( [ ...this.usuariosStore$.value, usuario ] );
  }

  private storeUpdate ( changes: IUsuario, id: number ) {
    this.usuariosStore$.next(
      this.usuariosStore$.value.map( item => {
        if ( item.id === id ) {
          item = changes;
        }
        return item;
      } )
    );
  }

  private storeDelete ( id: number ) {
    this.usuariosStore$.next(
      this.usuariosStore$.value.filter( item => item.id !== id )
    );
  }

}
