import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { IConfig, IRptaConfig, UpdateDtoConfig, CreateConfigDto } from '../models/config.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable( {
  providedIn: 'root'
} )
export class ConfiguracionService {

  private url = environment.urlBase;
  private storeConfig = new BehaviorSubject<IConfig>( {} as IConfig );

  get storeConfig$ () {
    return this.storeConfig.asObservable();
  }

  constructor(
    private http: HttpClient
  ) { }

  getOne ( id: number ) {
    if ( Object.keys( this.storeConfig.value ).length === 0 ) {
      this.http.get<IRptaConfig>( `${ this.url }/api/config/${ id }` ).pipe(
        tap( ( resp ) => this.storeOne( resp.data ) )
      ).subscribe();
    }
  }

  create ( data: CreateConfigDto ) {
    return this.http.post<IRptaConfig>( `${ this.url }/api/config`, data ).pipe(
      tap( resp => this.storeOne( resp.data ) )
    );
  }

  update ( change: UpdateDtoConfig, id: number ) {
    return this.http.put<IRptaConfig>( `${ this.url }/api/config/${ id }`, change ).pipe(
      tap( ( resp ) => this.storeOne( resp.data ) )
    );
  }

  //! store

  storeOne ( data: IConfig ) {
    this.storeConfig.next( data );
  }

}
