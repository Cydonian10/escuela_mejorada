import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILoginData, IResAuth } from '@core/models/auth.model';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { IRespUsuario } from '@core/models/usuario.model';
import { LocalStorageService } from './local-storage.service';
import { UsuarioService } from './usuario.service';

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  private url = environment.urlBase;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private usuarioService: UsuarioService
  ) { }

  login ( data: ILoginData ) {
    return this.http.post<IResAuth>( `${ this.url }/api/login`, data ).pipe(
      tap( ( resp ) => {
        if ( resp.acces_token ) {
          this.localStorageService.save( resp.acces_token, 'token' );
        }
        this.myProfile().subscribe();
      } ),
      catchError( ( error: HttpErrorResponse ) => {
        return this.evalError( error );
      } ),
    );
  }

  myProfile () {
    return this.http.get<IRespUsuario>( `${ this.url }/api/user-profile` ).pipe(
      tap( ( resp ) => this.usuarioService.setUser( resp.data ) )
    );
  }

  logout () {
    let headers = new HttpHeaders( {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${ this.localStorageService.get( 'token' ) }`
    } );

    localStorage.removeItem( 'token' );
    localStorage.removeItem( 'user' );
    return this.http.get<IResAuth>( `${ this.url }/api/logout`, { headers } );
  }

  evalError ( error: HttpErrorResponse ) {
    if ( error.status === HttpStatusCode.InternalServerError ) {
      return throwError( () => 'Algo esta fallando en el servidor' );
    }
    if ( error.status === HttpStatusCode.UnprocessableEntity ) {
      return throwError( () => 'Datos mal escritos' );
    }
    return throwError( () => 'Ups algo salio mal' );
  }

}
