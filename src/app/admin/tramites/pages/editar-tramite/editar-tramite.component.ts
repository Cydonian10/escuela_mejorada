import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap, Subscription } from 'rxjs';
import { TramiteService } from '@core/services/tramite.service';
import { Status } from '@core/models/statusPeticion.model';
import { ITramite } from '@core/models/tramite.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component( {
  selector: 'app-editar-tramite',
  templateUrl: './editar-tramite.component.html',
  styleUrls: [ './editar-tramite.component.scss' ]
} )
export class EditarTramiteComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  public statusLogin: Status = Status.init;
  url: string = '';
  id: number = 0;
  @ViewChild( 'asdownload' ) download!: ElementRef<HTMLAnchorElement>;

  myForm = this.fb.group( {
    apellidos: [ { value: '', disabled: true }, [ Validators.required ] ],
    name: [ { value: '', disabled: true }, [ Validators.required ] ],
    dni: [ { value: '', disabled: true }, [ Validators.required ] ],
    email: [ { value: '', disabled: true }, [ Validators.required ] ],
    descriptcion_padre: [ { value: '', disabled: true }, [ Validators.required ] ],
    tramite_nombre: [ { value: '', disabled: true }, [ Validators.required ] ],
    telefono: [ { value: '', disabled: true }, [ Validators.required ] ],
    archivo_padre: [ { value: '', disabled: true } ],
    fecha: [ { value: '', disabled: true }, [ Validators.required ] ],

    archivo_descargar_admin: [],
    descriptcion_recepcionista: [ , [ Validators.required ] ],
    tramite_estado: [ , [ Validators.required ] ],
    visto: [ , [ Validators.required ] ],
  } );

  constructor(
    private aRoute: ActivatedRoute,
    private tramiteService: TramiteService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  get archivoPadre () {
    return this.myForm.get( 'archivo_padre' );
  }

  get tramiteNombre () {
    return this.myForm.get( 'tramite_nombre' );
  }

  get fecha () {
    return this.myForm.get( 'fecha' );
  }

  ngOnInit (): void {
    this.getOneTramite();
  }
  ngOnDestroy (): void {
  }

  getOneTramite () {
    this.aRoute.params.pipe(
      switchMap( ( params: any ) => {
        const id = params.id;
        if ( id ) {
          return this.tramiteService.one( id );
        }
        return [ null ];
      } )
    ).subscribe( ( resp ) => {
      console.log( resp );
      this.id = resp?.data.id!;
      this.myForm.reset( {
        ...resp?.data,
        visto: ( resp?.data?.visto as boolean ) === false ? false : true
      } );
    } );
  }

  //! DESCARGANDO IMAGEN --> 🧨
  downloadFile () {
    const asdownload = this.download.nativeElement;
    asdownload.click();
  }

  handleSubmit () {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.statusLogin = Status.loading;

    let changes: ITramite = { ...this.myForm.value };
    this.tramiteService.update( changes, this.id ).subscribe(
      {
        next: () => {
          this.openEnviado( 'Editado', '❌' );
          this.statusLogin = Status.success;
        },
        error: () => {
          this.openCancel( 'Succedio un error', '❌' );
          this.statusLogin = Status.error;
        }
      }
    );
  }

  //! ** Respuestas **
  openCancel ( message: string, carita: string ) {
    this._snackBar.open( message, carita, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: [ 'bg-red-400', 'text-gray-900', 'border-l-4', 'border-red-800', 'font-semibold', 'tracking-widest' ]
    } );
  }

  openEnviado ( message: string, carita: string ) {
    this._snackBar.open( message, carita, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 5000,
      panelClass: [ 'bg-green-400', 'text-gray-900', 'border-l-4', 'border-green-800', 'font-semibold', 'tracking-widest' ]
    } );
  }
}
