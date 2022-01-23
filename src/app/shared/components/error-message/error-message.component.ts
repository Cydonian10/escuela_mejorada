import { Component, OnInit } from '@angular/core';

@Component( {
  selector: 'app-error-message',
  template: `
    <span class="text-pink-500 text-sm capitalize"><ng-content></ng-content></span>
  `,
  styles: [
  ]
} )
export class ErrorMessageComponent { }
