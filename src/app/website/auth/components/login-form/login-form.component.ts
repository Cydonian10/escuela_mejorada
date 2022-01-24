import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILoginData } from '@core/models/auth.model';
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
        next: () => {
          this.statusLogin = 'success';
          this.router.navigateByUrl( "/admin/usuarios" );
        },
        error: ( resp ) => {
          console.log( resp );
          this.statusLogin = 'error';
        }
      }
    );
  }

}
