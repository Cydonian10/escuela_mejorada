import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IAsitenciaLocalStorage, IAsistencia } from '@core/models/asistencia.model';
import { AsistenciaService } from '../../../../core/services/asistencia.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MarcarSalidaComponent } from '@admin/asistencias/components/marcar-salida/marcar-salida.component';
import { BorrarAsistenciasComponent } from '../../components/borrar-asistencias/borrar-asistencias.component';

@Component( {
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styleUrls: [ './salida.component.scss' ]
} )
export class SalidaComponent implements OnInit {

  subscription = new Subscription();
  displayedColumns: string[] = [ 'nombre', 'asistio', 'descripcion', 'descriptionSalida', 'horaEntrada', 'horaSalida', 'acciones' ];
  dataSource!: IAsitenciaLocalStorage[];

  constructor(
    private asistenciaService: AsistenciaService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit (): void {
    this.getAsitenciasDia();
  }

  getAsitenciasDia () {
    this.dataSource = this.asistenciaService.asistenciasDelDia;
  }

  //! ** Marcar salida **
  openMarcarSalida ( salida: IAsistencia ) {
    const refDialog = this.dialog.open( MarcarSalidaComponent, {
      width: "500px"
    } );

    this.subscription.add(
      refDialog.afterClosed().subscribe( resp => {
        if ( !resp ) {
          this.openEnviado( 'Cancelado', '🙁' );
          return;
        }
        this.asistenciaService.update( { ...resp, asistio: 1 }, salida.id ).subscribe( () => {
          this.asistenciaService.actulizarLocalStorage( { ...resp, asistio: 1 }, salida.id );
          this.openEnviado( 'Marco asistencia con exito', '😃' );

        } );
      } )
    );
  }

  // //!Eliminar salidas 
  eliminarSalidas () {
    const refDialog = this.dialog.open( BorrarAsistenciasComponent, {
      width: "500px"
    } );
    this.subscription.add(
      refDialog.afterClosed().subscribe( resp => {
        if ( !resp ) {
          this.openEnviado( 'Cancelado', '🙁' );
          return;
        }
        this.asistenciaService.limpiarRegistrosAsitencia();
        this.getAsitenciasDia();
        this.openEnviado( 'Eliminado asistencias del dia', ':)' );
      } )
    );
  }


  //! ** Respuestas **
  openCancel ( message: string, carita: string ) {
    this._snackBar.open( message, carita, {
      horizontalPosition: 'start',
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
