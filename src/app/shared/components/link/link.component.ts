import { Component, Input, OnInit } from '@angular/core';

@Component( {
  selector: 'app-link',
  template: `
    <li class="cursor-pointer hover:text-zinc-700 transition-all"
        routerLink
        fragment="{{ fragment }}"
        routerLinkActive="text-gray-600"
        [routerLinkActiveOptions]="{exact: true}"
    >
      <ng-content></ng-content>
    </li>

  `,
  styleUrls: [ './link.component.scss' ]
} )
export class LinkComponent {

  @Input() fragment: string = "";

}
