import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ITramiteNombre } from '@core/models/tramite.model';

@Component( {
  selector: 'app-tramite-form-create',
  templateUrl: './tramite-form-create.component.html',
  styleUrls: [ './tramite-form-create.component.scss' ]
} )
export class TramiteFormCreateComponent implements OnInit {

  tramiteNombre: ITramiteNombre[] = [ ITramiteNombre.matricula, ITramiteNombre.notas, ITramiteNombre.permiso, ITramiteNombre.vacante, ITramiteNombre.otro ];

  myForm = this.fb.group( {
    name: [ '', [ Validators.required ] ],
    apellidos: [ '', [ Validators.required ] ],
    dni: [ '', [ Validators.required ] ],
    email: [ '', [ Validators.required ] ],
    descriptcion_padre: [ '', [ Validators.required ] ],
    tramite_nombre: [ 'Selecciona una opción', [ Validators.required ] ],
    telefono: [ '', [ Validators.required ] ],
    archivo_padre: [ '', [ Validators.required ] ],
    fecha: [ '', [ Validators.required ] ],
  } );

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit (): void {
  }

  //! ** Enviando forulario ✈ **
  handleSubmit () {
    console.log( this.myForm.value );
  }

}
