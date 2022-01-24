import { Component, Input, OnInit } from '@angular/core';

@Component( {
  selector: 'app-link-navigate',
  template: `
     <li class="cursor-pointer hover:text-zinc-700 transition-all"
        [routerLink]="value"
    >
      <ng-content></ng-content>
    </li>
  `,
  styles: [
  ]
} )
export class LinkNavigateComponent {

  @Input() value: string = '';

}
