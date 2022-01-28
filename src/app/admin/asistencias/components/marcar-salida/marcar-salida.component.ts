import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import format from 'date-fns/format';

@Component( {
  selector: 'app-marcar-salida',
  templateUrl: './marcar-salida.component.html',
  styleUrls: [ './marcar-salida.component.scss' ]
} )
export class MarcarSalidaComponent {

  horaSalida: Date = new Date();
  myForm = this.fb.group( {
    description_salida: [],
    hora_salida: [],
  } );

  campoInvalido ( field: string ) {
    return this.myForm.get( field )?.errors && this.myForm.get( field )?.touched;
  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MarcarSalidaComponent>,
  ) { }

  handleSubmit () {
    this.myForm.get( 'hora_salida' )?.setValue( format( new Date(), 'yyyy/MM/dd HH:mm:ss' ) );
    this.dialogRef.close( this.myForm.value );
  }
}
