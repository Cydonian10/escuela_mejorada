import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, tap } from 'rxjs';

import { ITramite, CreateTramiteDto, UpdateTramiteDto, RespuestaTramites, RespuestaTramite } from '@core/models/tramite.model';

@Injectable( {
  providedIn: 'root'
} )
export class TramiteService {

  private url = environment.urlBase;
  private storeTramites = new BehaviorSubject<ITramite[]>( [] );

  get storeTramite$ () {
    return this.storeTramites.asObservable();
  }

  constructor( private http: HttpClient ) { }

  all () {
    if ( this.storeTramites.value.length === 0 ) {
      this.http.get<RespuestaTramites>( `${ this.url }/api/tramites` ).subscribe(
        {
          next: ( resp ) => this.storeTramites.next( resp.data.data ),
          error: () => console.log( 'salio mal' )
        }
      );
    }
  }

  create ( data: CreateTramiteDto ) {
    return this.http.post<RespuestaTramite>( `${ this.url }/api/tramites`, data ).pipe(
      tap( ( resp ) => this.storeCrate( resp.data ) )
    );
  }

  update ( changes: UpdateTramiteDto, id: number ) {
    return this.http.put<RespuestaTramite>( `${ this.url }/api/tramites/${ id }`, changes ).pipe(
      tap( ( resp ) => this.storeUpdate( resp.data, resp.data.id ) )
    );
  };

  delete ( id: number ) {
    return this.http.delete<RespuestaTramite>( `${ this.url }/api/tramites/${ id }` ).pipe(
      tap( () => this.storeDelete( id ) )
    );
  }


  storeCrate ( data: ITramite ) {
    this.storeTramites.next( [ ...this.storeTramites.value, data ] );
  }

  storeUpdate ( data: ITramite, id: number ) {
    this.storeTramites.next(
      this.storeTramites.value.map( ( item ) => {
        if ( item.id === id ) {
          item = data;
        }
        return item;
      } )
    );
  }

  storeDelete ( id: number ) {
    this.storeTramites.next(
      this.storeTramites.value.filter( ( item ) => item.id !== id )
    );
  };
}
