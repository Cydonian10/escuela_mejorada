import { Component, OnInit } from '@angular/core';

@Component( {
  selector: 'app-titulo',
  template: `
      <div>
          <h2 class="lines-effect text-2xl mt-4 font-bold">
            <ng-content></ng-content>
          </h2>
      </div>
  `,
  styleUrls: [ './titulo.component.scss' ]
} )
export class TituloComponent implements OnInit {

  constructor() { }

  ngOnInit (): void {
  }

}
