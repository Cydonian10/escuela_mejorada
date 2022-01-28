import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IAsitenciaLocalStorage, CreateAsistenciaDto, IAsitenciaResponse, UpdateAsisteciaDto, IAsitenciasResponse } from '../models/asistencia.model';

@Injectable( {
  providedIn: 'root'
} )
export class AsistenciaService {

  asistenciasDelDia: IAsitenciaLocalStorage[] = [];
  apiUrl: string = environment.urlBase;

  constructor(
    private http: HttpClient
  ) {
    this.asistenciasDelDia = JSON.parse( localStorage.getItem( 'asistenciasDia' )! ) || [];
  }

  localStorageAsistencia ( asistencia: IAsitenciaLocalStorage ) {
    this.asistenciasDelDia.push( asistencia );
    localStorage.setItem( 'asistenciasDia', JSON.stringify( this.asistenciasDelDia ) );
  }

  actulizarLocalStorage ( changes: UpdateAsisteciaDto, id: number ) {
    this.asistenciasDelDia = this.asistenciasDelDia.map( item => {
      if ( item.id == id ) {
        item.hora_salida = changes.hora_salida!;
        item.description_salida = changes.description_salida || '';
        item.asistio = changes.asistio!;
      }
      return item;
    } );
    localStorage.setItem( 'asistenciasDia', JSON.stringify( this.asistenciasDelDia ) );

  }

  create ( data: CreateAsistenciaDto ) {
    return this.http.post<IAsitenciaResponse>( `${ this.apiUrl }/api/asistencias`, data );
  }

  update ( changes: UpdateAsisteciaDto, id: number ) {
    return this.http.put<IAsitenciaResponse>( `${ this.apiUrl }/api/asistencias/${ id }`, changes );
  };

  asistenciaByUsuario ( data: any, id: number ) {
    return this.http.post<IAsitenciasResponse>( `${ this.apiUrl }/api/users/usuarios-asistencias-fecha/${ id }`, data );
  }

  limpiarRegistrosAsitencia () {
    this.asistenciasDelDia = [];
    localStorage.removeItem( 'asistenciasDia' );
  }

}
