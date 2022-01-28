import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUsuario } from '@core/models/usuario.model';
import { UsuarioService } from '@core/services/usuario.service';
import formatDistance from 'date-fns/formatDistance';
import es from 'date-fns/locale/es';
import format from 'date-fns/format';
import { AsistenciaService } from '@core/services/asistencia.service';
import { Router } from '@angular/router';

@Component( {
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: [ './asistencia.component.scss' ]
} )
export class AsistenciaComponent implements OnInit {

  myInput: FormControl = new FormControl( '', Validators.required );
  error: boolean = false;
  usuario: IUsuario = {} as IUsuario;
  horaEntrada: Date = new Date();
  horaEntradaDiario: Date = new Date();

  myForm = this.fb.group( {
    user_id: [ , Validators.required ],
    hora_entrada: [ , Validators.required ],
    description: [ , Validators.required ],
    fecha: [ , Validators.required ]
  } );

  constructor(
    private usuarioService: UsuarioService,
    private _snackBar: MatSnackBar,
    private asistenciaService: AsistenciaService,
    private fb: FormBuilder,
    private router: Router

  ) { }

  ngOnInit (): void {
    this.horaEntradaDiario.setHours( 8, 0, 0 );
  }

  //!TRAER USUARIO POR EMAIL
  usuarioByEmail () {
    this.error = false;

    if ( this.myInput.invalid ) {
      this.myInput.markAllAsTouched;
      return;
    }
    this.usuarioService.userByEmail( this.myInput.value.trim() ).subscribe(
      {
        next: resp => { this.usuario = resp.data; console.log( this.usuario ); },
        error: ( e ) => this.error = true
      }
    );
    this.myInput.reset();
  }

  //!MARCAR ASISTENCIA
  marcarAsistencia () {
    const horas = formatDistance( this.horaEntradaDiario, new Date(), { locale: es } );
    this.myForm.get( 'user_id' )?.setValue( this.usuario.id );
    this.myForm.get( 'hora_entrada' )?.setValue( format( new Date(), 'yyyy/MM/dd HH:mm:ss', { locale: es } ) );
    this.myForm.get( 'fecha' )?.setValue( format( new Date(), 'yyyy/MM/dd HH:mm:ss', { locale: es } ) );
    this.myForm.get( 'description' )?.setValue( 'Llego tarde' + ' ' + horas + ' ' + 'tarde' );

    console.log( this.myForm.value );


    this.asistenciaService.create( this.myForm.value ).subscribe( resp => {
      console.log( resp, 'asistencias' );
      this.openEnviado( 'Asistencia registrada', '😃' );
      this.asistenciaService.localStorageAsistencia( resp.data as any );
      this.router.navigateByUrl( "/admin/asistencias/salida" );
    } );

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
