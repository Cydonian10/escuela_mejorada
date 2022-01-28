import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component( {
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styles: [
  ]
} )
export class ConfirmDeleteComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: any,
  ) { }

  ngOnInit (): void {
  }

  closeModal (): void {
    this.dialogRef.close( false );
  }


}
