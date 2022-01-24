import { Injectable } from '@angular/core';

@Injectable( {
  providedIn: 'root'
} )
export class LocalStorageService {

  constructor() { }

  save ( value: any ) {
    localStorage.setItem( 'user', JSON.stringify( value ) );
  }

  get () {
    const user = JSON.parse( localStorage.getItem( 'user' )! ) || null;
    return user;
  }
}
