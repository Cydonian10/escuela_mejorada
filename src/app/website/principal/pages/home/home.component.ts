import { Component, OnInit } from '@angular/core';
import { IConfig } from '@core/models/config.model';
import { ConfiguracionService } from '@core/services/configuracion.service';
import { IServicios } from '@website/principal/interfaces/servicios.interface';
import { Observable } from 'rxjs';

@Component( {
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
} )
export class HomeComponent implements OnInit {

  servicios: IServicios[] = [
    {
      image: 'assets/images/image1.jpg', title: 'Solicitud de trámite',
      descripcion: 'Realizar trámites como matrícula',
      url: "/tramites"
    },
    {
      image: 'assets/images/image2.jpg', title: 'Directorio de profesores',
      descripcion: 'Visualiza el listado de profesores',
      url: "/profesores"
    },
    {
      image: 'assets/images/image3.jpg', title: 'Asistencias de personal',
      descripcion: 'Marque su asistencia del día',
      url: "/admin/asistencias"
    }
  ];

  config!: Observable<IConfig>;

  constructor(
    private configService: ConfiguracionService
  ) {
    this.configService.getOne( 1 );
  }

  ngOnInit (): void {
    this.config = this.configService.storeConfig$;
  }

}
