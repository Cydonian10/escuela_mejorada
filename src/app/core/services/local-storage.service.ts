import { Injectable } from '@angular/core';

@Injectable( {
  providedIn: 'root'
} )
export class LocalStorageService {

  constructor() { }

  save ( value: any, nombre: string ) {
    localStorage.setItem( nombre, JSON.stringify( value ) );
  }

  get ( nombre: string ) {
    const user = JSON.parse( localStorage.getItem( nombre )! ) || null;
    return user;
  }
}
