import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable( {
  providedIn: 'root'
} )
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  redirec ( flag: boolean ) {
    if ( !flag ) {
      this.router.navigateByUrl( "/auth/login" );
    }
  }

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean> | boolean | UrlTree {

    const token = this.localStorageService.get( 'token' ) ? true : false;

    if ( this.usuarioService.user$.value ) {
      this.authService.myProfile().subscribe(
        {
          next: ( resp ) => {
            this.usuarioService.setUser( resp.data );
            // this.router.navigateByUrl( "/admin/usuarios" );
          },
          error: () => {
            this.router.navigateByUrl( "/auth/login" );
          }
        }
      );
    }

    this.redirec( token );

    return token;

  }
  canLoad (
    route: Route,
    segments: UrlSegment[] ): Observable<boolean> | boolean | UrlTree {

    const token = this.localStorageService.get( 'token' ) ? true : false;

    if ( this.usuarioService.user$.value ) {
      this.authService.myProfile().subscribe(
        {
          next: ( resp ) => {
            this.usuarioService.setUser( resp.data );


            // this.router.navigateByUrl( "/admin/usuarios" );
          },
          error: () => {
            this.router.navigateByUrl( "/auth/login" );
          }
        }
      );
    }

    this.redirec( token );

    return token;
  }
}
