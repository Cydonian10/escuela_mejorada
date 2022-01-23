import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ITramite, ITramiteEstado, ITramiteNombre } from '@core/models/tramite.model';

@Component( {
  selector: 'app-tramite-model-info',
  templateUrl: './tramite-model-info.component.html',
  styleUrls: [ './tramite-model-info.component.scss' ]
} )
export class TramiteModelInfoComponent implements OnInit {

  @ViewChild( 'asdownload' ) download!: ElementRef<HTMLAnchorElement>;
  @Input() show: boolean = false;
  @Input() tramite: ITramite = {
    id: 0,
    apellidos: '',
    name: '',
    dni: '',
    email: '',
    descriptcion_padre: '',
    tramite_nombre: ITramiteNombre.matricula,
    telefono: '',
    fecha: new Date(),
    archivo_padre: '',

    archivo_descargar_admin: '',
    descriptcion_recepcionista: '',
    tramite_estado: ITramiteEstado.aprobado,
    visto: false,
    updated_at: new Date(),

  };
  @Output() onShow: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit (): void {
  }

  closeModal () {
    this.onShow.emit( !this.show );
  }

  //! DESCARGANDO IMAGEN --> 🧨
  downloadFile () {
    const asdownload = this.download.nativeElement;
    asdownload.click();
  }
}
