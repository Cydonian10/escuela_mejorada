import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ITramiteNombre } from '@core/models/tramite.model';
import { UploadImageService } from '@core/services/upload-image.service';
import format from 'date-fns/format';
import es from 'date-fns/locale/es';
;

import { Subscription } from 'rxjs';
import { TramiteService } from '@core/services/tramite.service';
import { CreateTramiteDto } from '../../../../core/models/tramite.model';

@Component( {
  selector: 'app-tramite-form-create',
  templateUrl: './tramite-form-create.component.html',
  styleUrls: [ './tramite-form-create.component.scss' ]
} )
export class TramiteFormCreateComponent implements OnInit {

  private suscriptions: Subscription = new Subscription();
  url: string = '';
  show: boolean = false;
  codigo: number = 0;
  tramiteNombre: ITramiteNombre[] = [ ITramiteNombre.matricula, ITramiteNombre.notas, ITramiteNombre.permiso, ITramiteNombre.vacante, ITramiteNombre.otro ];

  myForm = this.fb.group( {
    name: [ '', [ Validators.required ] ],
    apellidos: [ '', [ Validators.required ] ],
    dni: [ '', [ Validators.required ] ],
    email: [ '', [ Validators.required ] ],
    descriptcion_padre: [ '', [ Validators.required ] ],
    tramite_nombre: [ '', [ Validators.required ] ],
    telefono: [ '', [ Validators.required ] ],
    archivo_padre: [ '' ],
    fecha: [ format( new Date(), 'yyyy/MM/dd HH:mm:ss', { locale: es } ), [ Validators.required ] ],
  } );

  campoInvalido ( field: string ) {
    return this.myForm.get( field )?.errors && this.myForm.get( field )?.touched;
  }

  constructor(
    private fb: FormBuilder,
    private uploadImageService: UploadImageService,
    private tramiteService: TramiteService,
  ) { }

  ngOnInit (): void {
  }

  // //!CARGANDO IMAGEN --> 🎨
  uploadFile ( e: Event ) {
    this.uploadImageService.uploadFile( e );
    this.suscriptions.add( this.uploadImageService.urlImage.subscribe( url => {
      this.url = url;
      this.myForm.get( 'archivo_padre' )?.setValue( url );
    } ) );
  }

  //! ** Cerrndo el modal **
  onshow ( e: boolean ) {
    this.show = e;
  }


  //! ** Enviando forulario ✈ **
  handleSubmit () {
    if ( this.myForm.invalid ) {
      return this.myForm.markAllAsTouched();
    }

    const data: CreateTramiteDto = { ...this.myForm.value };

    this.tramiteService.create( data ).subscribe( ( resp ) => {
      this.codigo = resp.data.id;
      this.show = true;
    } );

    this.myForm.reset();

  }

}
