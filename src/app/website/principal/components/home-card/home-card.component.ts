import { Component, Input, OnInit } from '@angular/core';
import { IServicios } from '@website/principal/interfaces/servicios.interface';

@Component( {
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: [ './home-card.component.scss' ]
} )
export class HomeCardComponent {

  @Input() servicios: IServicios = {
    image: '',
    title: '',
    descripcion: '',
    url: ''
  };

}
