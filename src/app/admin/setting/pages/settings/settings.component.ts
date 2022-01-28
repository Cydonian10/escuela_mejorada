import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfiguracionService } from '@core/services/configuracion.service';
import { UpdateDtoConfig, IConfig } from '@core/models/config.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component( {
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: [ './settings.component.scss' ]
} )
export class SettingsComponent implements OnInit {

  statusLogin: 'loading' | 'success' | 'error' | 'init' = 'init';
  error: string = "";

  myForm = this.fb.group( {
    nombre_escuela: [ , [ Validators.required ] ],
    telefono_escuela: [ , [ Validators.required ] ],
    facebook_esculea: [ , [ Validators.required ] ],
    frase_escuela: [ , [ Validators.required ] ],
    description: [ , [ Validators.required ] ],
  } );

  campoInvalido ( field: string ) {
    return this.myForm.get( field )?.errors && this.myForm.get( field )?.touched;
  }

  constructor(
    private configuracionService: ConfiguracionService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.configuracionService.getOne( 1 );
  }

  ngOnInit (): void {
    this.getOne();
  }

  getOne () {
    this.configuracionService.storeConfig$.subscribe( {
      next: ( config ) => { this.myForm.reset( config ); },
      error: () => { }
    } );
  }

  handleSubmit () {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.statusLogin = 'loading';
    const value: UpdateDtoConfig = { ...this.myForm.value };

    this.configuracionService.update( value, 1 ).subscribe( {
      next: () => { this.handleNext(); },
      error: ( e ) => { this.handleError( e ); }
    } );
  }

  //! ** Estados de submit **
  handleNext () {
    this.openEnviado( 'Datos actulizados', '❌' );
    this.statusLogin = 'success';
    this.error = '';
  }

  handleError ( resp: any ) {
    this.openCancel( 'Error en actulizar', '❌' );
    this.statusLogin = 'error';
    this.error = 'sucedio un error';
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
