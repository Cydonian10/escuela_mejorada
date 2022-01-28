import { Component, Input, OnInit } from '@angular/core';

@Component( {
  selector: 'app-link-admin',
  template: `
    <div class="flex justify-center">
      <p  [routerLink]="url"
      routerLinkActive="active"
      class="w-44 rounded px-3 mt-1  border border-secundary py-3 hover:scale-105 flex items-center">
      <mat-icon class="mr-1 block">{{icon}}</mat-icon> 
        <ng-content></ng-content>
      </p>
    </div>
  `,
  styles: [
  ]
} )
export class LinkAdminComponent {
  @Input() url: string = '/admin/usuarios';
  @Input() icon: string = '';
}
