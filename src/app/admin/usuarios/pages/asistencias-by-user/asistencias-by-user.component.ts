import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUsuario } from '@core/models/usuario.model';
import { switchMap } from 'rxjs';
import { UsuarioService } from '@core/services/usuario.service';
import format from 'date-fns/format';
import es from 'date-fns/locale/es';
import { AsistenciaService } from '@core/services/asistencia.service';
import { map } from 'rxjs/operators';
import { IAsistencia } from '../../../../core/models/asistencia.model';


@Component( {
  selector: 'app-asistencias-by-user',
  templateUrl: './asistencias-by-user.component.html',
  styleUrls: [ './asistencias-by-user.component.scss' ]
} )
export class AsistenciasByUserComponent implements OnInit {

  displayedColumns: string[] = [ 'Entrada', 'Salida', 'Fecha', 'Descripcion Salida', 'Tardanza', 'Asistio', 'Asistidos', 'total', 'nombre' ];;
  usuario: IUsuario = {} as IUsuario;
  asistenciasMostrar: any[] = [];

  myForm = this.fb.group( {
    inicio: [ , [ Validators.required ] ],
    fin: [ , [ Validators.required ] ],
  } );

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private aRoute: ActivatedRoute,
    private asistenciaService: AsistenciaService
  ) { }

  ngOnInit (): void {
    this.getOneUsuario();
  }

  getOneUsuario () {
    this.aRoute.params.pipe(
      switchMap( ( params: any ) => {
        const id = params.id;
        if ( id ) {
          return this.usuarioService.one( id );
        }
        return [ null ];
      } )
    ).subscribe( ( resp ) => this.usuario = resp?.data! );
  }

  handleSubmit () {
    if ( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }

    const data = {
      fecha_inicio: format( this.myForm.get( 'inicio' )?.value, 'yyyy/MM/dd HH:mm:ss', { locale: es } ),
      fecha_fin: format( this.myForm.get( 'fin' )?.value, 'yyyy/MM/dd HH:mm:ss', { locale: es } )
    };
    this.asistenciaService.asistenciaByUsuario( data, this.usuario.id ).pipe(
      map( resp => this.mapearDatos( resp.data ) )
    ).subscribe( resp => {
      console.log( resp );
      this.asistenciasMostrar = resp;
    } );

  }

  mapearDatos ( value: IAsistencia[] ) {
    const asistenciasTotal = this.totalAsistencias( value );

    return value.map( ( data ) => {

      const hora_entrada = data.hora_entrada ? format( new Date( data.hora_entrada ), 'hh:mm aaa' ) : null;
      const hora_salida = data.hora_salida ? format( new Date( data.hora_salida ), 'hh:mm aaa' ) : null;
      const fecha = format( new Date( data.fecha ), 'y/MMM/dd', { locale: es } );


      return { ...data, hora_entrada, fecha, hora_salida, total: value.length, asistidos: asistenciasTotal };;
    } );

  }

  totalAsistencias ( value: IAsistencia[] ) {
    let total = 0;
    console.log( value );
    value.forEach( element => {
      if ( element.asistio === 1 ) {
        total = total + 1;
      }
    } );
    return total;
  }
}
