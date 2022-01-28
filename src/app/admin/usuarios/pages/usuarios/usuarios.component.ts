import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '@core/services/usuario.service';
import { Subscription } from 'rxjs';
import { IUsuario } from '@core/models/usuario.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from '../../components/delete-user/delete-user.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component( {
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: [ './usuarios.component.scss' ]
} )
export class UsuariosComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = [ 'nombre', 'gradoSeccion', 'dni', 'email', 'rol', 'telefono', 'acciones' ];
  dataSource: MatTableDataSource<IUsuario> = new MatTableDataSource();

  private subscription = new Subscription();

  constructor(
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    this.usuarioService.findAll();
  }

  ngOnInit (): void {
    this.findAll();
  }

  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  }

  //! ** Trear los usuarios **
  findAll () {
    this.subscription.add(
      this.usuarioService.usuariosStore.subscribe( resp => {
        this.dataSource = new MatTableDataSource( resp );
      } )
    );
  }

  //! ** Elimnado usuarios **
  deleteUsuario ( id: number, data: any ) {
    const dialogRef = this.dialog.open( DeleteUserComponent, {
      width: '350px',
      data
    } );

    dialogRef.afterClosed().subscribe( result => {
      if ( !result ) {
        this.openCancel( 'Cancelado', '❌' );
        return;
      }
      this.usuarioService.remove( id ).subscribe(
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
