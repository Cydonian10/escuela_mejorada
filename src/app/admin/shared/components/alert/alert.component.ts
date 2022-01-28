import { Component, Input, OnInit } from '@angular/core';

@Component( {
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: [

  ]
} )
export class AlertComponent {

  @Input() visible: string = 'success';
  @Input() type: string = 'success';

}
