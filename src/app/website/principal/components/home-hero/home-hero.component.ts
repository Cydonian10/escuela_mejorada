import { Component, OnDestroy, OnInit } from '@angular/core';
import { IConfig } from '@core/models/config.model';
import { ConfiguracionService } from '@core/services/configuracion.service';
import { Observable, Subscription } from 'rxjs';

@Component( {
  selector: 'app-home-hero',
  templateUrl: './home-hero.component.html',
  styleUrls: [ './home-hero.component.scss' ]
} )
export class HomeHeroComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  config!: IConfig;

  constructor(
    private ConfigService: ConfiguracionService
  ) {
    this.ConfigService.getOne( 1 );
  }

  ngOnInit (): void {
    this.subscription.add(
      this.ConfigService.storeConfig$.subscribe(
        {
          next: ( resp ) => { this.config = resp; }
        }
      )
    );
  }
  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  }


}
