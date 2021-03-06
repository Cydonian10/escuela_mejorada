import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component( {
  selector: 'app-button',
  template: `
  <button
        (click)="onClick($event)"
        [disabled]="disable"
        class="bg-primary py-2 px-20 text-white tracking-widest hover:bg-primary/40 hover:text-primary">
        <ng-content></ng-content>
  </button>
  `,
  styleUrls: [ './button.component.scss' ]
} )
export class ButtonComponent {

  @Input() disable: boolean = false;
  @Output() onClickFunction = new EventEmitter();

  onClick ( e: Event ) {
    this.onClickFunction.emit( e );
  }
}
