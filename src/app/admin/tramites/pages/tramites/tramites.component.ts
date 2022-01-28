import { Component, OnDestroy, OnInit } from '@angular/core';
import { TramiteService } from '@core/services/tramite.service';
import { Subscription } from 'rxjs';
import { ITramite } from '@core/models/tramite.model';
import { Status } from '@core/models/statusPeticion.model';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '@admin/tramites/components/confirm-delete/confirm-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component( {
  selector: 'app-tramites',
  templateUrl: './tramites.component.html',
  styleUrls: [ './tramites.component.scss' ]
} )
export class TramitesComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  public status: Status = Status.init;
  public tramites: ITramite[] = [];
  displayedColumns: string[] = [ 'nombre', 'tramiteEstado', 'visto', 'tramiteNombre', 'fecha', 'editar' ];

  constructor(
    private tramiteService: TramiteService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit (): void {
    this.tramiteService.all();
    this.getTramites();
  }

  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  }

  getTramites () {
    this.status = Status.loading;

    this.tramiteService.storeTramite$.subscribe( {
      next: ( tramites ) => {
        this.tramites = tramites;
        this.status = Status.init;
      },
      error: () => this.status = Status.error
    } );

  }

  deleteTramite ( id: number ) {
    const dialogRef = this.dialog.open( ConfirmDeleteComponent, {
      width: '350px',
    } );

    dialogRef.afterClosed().subscribe( result => {
      if ( !result ) {
        this.openCancel( 'Cancelado', '❌' );
        return;
      }
      this.tramiteService.delete( id ).subscribe(
        {
          next: () => this.openEnviado( 'Eliminado', '❌' )
        }
      );
    } );
  }

  //! ** Respuestas **
  openCancel ( message: string, carita: string ) {
    this._snackBar.open( message, carita, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: [ 'bg-red-400', 'text-red-900', 'border-l-4', 'border-red-800', 'font-semibold', 'tracking-widest' ]
    } );
  }

  openEnviado ( message: string, carita: string ) {
    this._snackBar.open( message, carita, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: [ 'bg-green-400', 'text-green-900', 'border-l-4', 'border-green-800', 'font-semibold', 'tracking-widest' ]
    } );
  }

}
