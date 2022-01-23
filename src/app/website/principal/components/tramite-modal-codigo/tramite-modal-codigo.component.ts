import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component( {
  selector: 'app-tramite-modal-codigo',
  templateUrl: './tramite-modal-codigo.component.html',
  styleUrls: [ './tramite-modal-codigo.component.scss' ]
} )
export class TramiteModalCodigoComponent implements OnInit {

  @Input() show: boolean = false;
  @Input() codigo: number = 0;
  @Output() onShow: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit (): void {
  }

  closeModal () {
    this.onShow.emit( !this.show );
  }

}
