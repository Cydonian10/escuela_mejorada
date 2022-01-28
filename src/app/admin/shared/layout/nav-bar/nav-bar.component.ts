import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from '@core/services/usuario.service';
import { IUsuario } from '@core/models/usuario.model';

@Component( {
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: [ './nav-bar.component.scss' ]
} )
export class NavBarComponent implements OnInit {

  user$!: Observable<IUsuario>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe( Breakpoints.Handset )
    .pipe(
      map( result => result.matches ),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit (): void {
    this.user$ = this.usuarioService.user$;
  }

  logaout () {
    this.authService.logout().subscribe();
    this.router.navigateByUrl( "/auth/login" );
  }
}
