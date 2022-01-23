import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalRoutingModule } from './principal-routing.module';

//! ** Components **
import { HomeComponent } from './pages/home/home.component';
import { TramitesComponent } from './pages/tramites/tramites.component';
import { ProfesoresComponent } from './pages/profesores/profesores.component';

//! ** Modulos propios **
import { SharedModule } from '@shared/shared.module';
import { HomeHeroComponent } from './components/home-hero/home-hero.component';
import { HomeCardComponent } from './components/home-card/home-card.component';
import { TramiteFormCreateComponent } from './components/tramite-form-create/tramite-form-create.component';
import { TramiteFormInfoComponent } from './components/tramite-form-info/tramite-form-info.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule( {
  declarations: [
    HomeComponent,
    TramitesComponent,
    ProfesoresComponent,
    HomeHeroComponent,
    HomeCardComponent,
    TramiteFormCreateComponent,
    TramiteFormInfoComponent
  ],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: []
} )
export class PrincipalModule { }
