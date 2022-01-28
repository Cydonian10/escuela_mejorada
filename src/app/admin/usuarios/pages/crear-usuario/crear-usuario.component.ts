import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Status } from '@core/models/statusPeticion.model';
import { CreateUsuarioDto } from '@core/models/usuario.model';
import { Subscription } from 'rxjs';
import { UsuarioService } from '@core/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: [ './crear-usuario.component.scss' ]
} )
export class CrearUsuarioComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  status: Status = Status.init;
  myForm = this.fb.group( {
    name: [ '', [ Validators.required ] ],
    last_name: [ '', [ Validators.required ] ],
    email: [ '', [ Validators.required ] ],
    dni: [ '', [ Validators.required ] ],
    rol: [ 'admin', [ Validators.required ] ],
    password: [ '', [ Validators.required ] ],
    telefono: [ '', [ Validators.required ] ],
    grado_seccion: [ '', [ Validators.required ] ],
  } );

  campoInvalido ( field: string ) {
    return this.myForm.get( field )?.errors && this.myForm.get( field )?.touched;
  }

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit (): void {
  }
  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  }

  handleSubmit () {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    const data: CreateUsuarioDto = { ...this.myForm.value };

    this.subscription.add(
      this.usuarioService.create( data ).subscribe(
        {
          next: () => {
            this.status = Status.success;
            this.openEnviado( 'Usuario Creado', '❌' );
            this.router.navigateByUrl( "/admin/usuarios" );
          },
          error: () => {
            this.status = Status.error;
            this.openCancel( 'Peticion fallida', '❌' );
          }
        }
      )
    );

  }

  //! ** Respuestas **
  openCancel ( message: string, carita: string ) {
    this._snackBar.open( message, carita, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: [ 'bg-red-400', 'text-gray-900', 'border-l-4', 'border-red-800', 'font-semibold', 'tracking-widest' ]
    } );
  }

  openEnviado ( message: string, carita: string ) {
    this._snackBar.open( message, carita, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: [ 'bg-green-400', 'text-gray-900', 'border-l-4', 'border-green-800', 'font-semibold', 'tracking-widest' ]
    } );
  }
}
