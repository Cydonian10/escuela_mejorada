import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component( {
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: [ './delete-user.component.scss' ]
} )
export class DeleteUserComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject( MAT_DIALOG_DATA ) public data: any,
  ) { }

  ngOnInit (): void {
  }

  closeModal (): void {
    this.dialogRef.close( false );
  }

}
