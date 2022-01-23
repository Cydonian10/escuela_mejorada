import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import( "./website/website.module" ).then( m => m.WebsiteModule )
  }
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled'
};

@NgModule( {
  imports: [ RouterModule.forRoot( routes, routerOptions ) ],
  exports: [ RouterModule ]
} )
export class AppRoutingModule { }
