import { Component, OnInit } from '@angular/core';

@Component( {
  selector: 'app-button-tramite',
  template: `
   <button  routerLink="/tramites"
            class="bg-primary border border-primary font-semibold py-2 w-64 tracking-widest shadow-lg shadow-primary/40 hover:bg-transparent hover:text-primary transition-all duration-300">
        <ng-content ></ng-content>
    </button>
  `,
  styles: [
  ]
} )
export class ButtonTramiteComponent { }
