import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILoginData, IResAuth } from '@core/models/auth.model';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class AuthService {

  private url = environment.urlBase;

  constructor(
    private http: HttpClient
  ) { }

  login ( data: ILoginData ) {
    return this.http.post<IResAuth>( `${ this.url }/api/login`, data ).pipe(
      catchError( ( error: HttpErrorResponse ) => this.evalError( error ) )
    );
  }


  evalError ( error: HttpErrorResponse ) {
    if ( error.status === HttpStatusCode.InternalServerError ) {
      return throwError( () => 'Algo esta fallando en el servidor' );
    }
    if ( error.status === HttpStatusCode.UnprocessableEntity ) {
      return throwError( () => 'Datos mal escritos' );
    }
    return throwError( () => 'Up algo salio mal' );
  }

}
