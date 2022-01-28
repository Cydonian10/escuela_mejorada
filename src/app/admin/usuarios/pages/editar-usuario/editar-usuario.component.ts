import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Status } from '@core/models/statusPeticion.model';
import { Subscription, switchMap } from 'rxjs';
import { UsuarioService } from '@core/services/usuario.service';
import { UpdateUsuarioDto } from '@core/models/usuario.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component( {
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: [ './editar-usuario.component.scss' ]
} )
export class EditarUsuarioComponent implements OnInit {

  private subscription = new Subscription();
  status: Status = Status.init;
  id: number = 0;
  myForm = this.fb.group( {
    name: [ '', [ Validators.required ] ],
    last_name: [ '', [ Validators.required ] ],
    email: [ '', [ Validators.required ] ],
    dni: [ '', [ Validators.required ] ],
    rol: [ 'admin', [ Validators.required ] ],
    telefono: [ '', [ Validators.required ] ],
    grado_seccion: [ '', [ Validators.required ] ],
  } );

  campoInvalido ( field: string ) {
    return this.myForm.get( field )?.errors && this.myForm.get( field )?.touched;
  }
  constructor(
    private usuarioService: UsuarioService,
    private aRoute: ActivatedRoute,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit (): void {
    this.getOneUsuario();
  }

  getOneUsuario () {
    this.aRoute.params.pipe(
      switchMap( ( params: any ) => {
        const id = params.id;
        if ( id ) {
          return this.usuarioService.one( id );
        }
        return [ null ];
      } )
    ).subscribe( ( resp ) => {
      this.id = resp?.data.id!;
      this.myForm.reset( resp?.data );
    } );
  }

  handleSubmit () {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    const data: UpdateUsuarioDto = { ...this.myForm.value };

    this.subscription.add(
      this.usuarioService.update( data, this.id ).subscribe(
        {
          next: () => {
            this.status = Status.success;
            this.openEnviado( 'Usuario Editado', '❌' );
            // this.router.navigateByUrl( "/admin/usuarios" );
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
