import { Component, OnInit } from '@angular/core';

@Component( {
  selector: 'app-label',
  template: `
   <label
         class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
        <ng-content ></ng-content>
    </label>
  `,
  styleUrls: [ './label.component.scss' ]
} )
export class LabelComponent implements OnInit {

  constructor() { }

  ngOnInit (): void {
  }

}
