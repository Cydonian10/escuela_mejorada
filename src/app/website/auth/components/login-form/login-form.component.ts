import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginData, IResAuth } from '@core/models/auth.model';
import { AuthService } from '@core/services/auth.service';
import { Subscription } from 'rxjs';

@Component( {
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: [ './login-form.component.scss' ]
} )
export class LoginFormComponent implements OnInit {

  //private subscription = new Subscription();
  statusLogin: 'loading' | 'success' | 'error' | 'init' = 'init';
  error: string = "";

  myForm = this.fb.group( {
    'email': [ , [ Validators.required ] ],
    'password': [ , [ Validators.required ] ]
  } );

  campoInvalido ( field: string ) {
    return this.myForm.get( field )?.errors && this.myForm.get( field )?.touched;
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit (): void {
  }

  handleSubmit () {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    const value: ILoginData = { ...this.myForm.value };

    this.statusLogin = 'loading';
    this.authService.login( value ).subscribe(
      {
        next: ( resp ) => this.handleNext( resp ),
        error: ( resp ) => this.handleError( resp )
      }
    );
  }


  //! ** Estados de submit **
  handleNext ( resp: IResAuth ) {
    this.statusLogin = 'success';
    this.error = '';
    resp.message === 'El usuario no existe' ?
      this.error = resp.message : this.router.navigateByUrl( "/admin/usuarios" );
  }

  handleError ( resp: string ) {
    this.statusLogin = 'error';
    this.error = resp;
  }
}
