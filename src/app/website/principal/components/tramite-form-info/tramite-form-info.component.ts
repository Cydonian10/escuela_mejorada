import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TramiteService } from '@core/services/tramite.service';
import { ITramite } from '@core/models/tramite.model';

@Component( {
  selector: 'app-tramite-form-info',
  templateUrl: './tramite-form-info.component.html',
  styleUrls: [ './tramite-form-info.component.scss' ]
} )
export class TramiteFormInfoComponent implements OnInit {

  show: boolean = false;
  tramite!: ITramite;
  myInput = new FormControl( '', [ Validators.required ] );
  error: string = '';

  constructor(
    private tramiteService: TramiteService
  ) { }

  ngOnInit (): void {
  }

  //! Cerrar el modal
  onshow ( e: boolean ) {
    this.show = e;
  }

  handleSubmit ( e: Event ) {
    e.preventDefault();
    if ( this.myInput.invalid ) {
      return this.myInput.markAllAsTouched();
    }

    this.tramiteService.one( this.myInput.value ).subscribe( resp => {
      if ( !resp.data ) {
        this.error = 'No existe el código';
        return;
      }
      this.tramite = resp.data;
      this.show = true;
      this.error = '';
    } );

    this.myInput.reset();

  }

}
