import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "",
    loadChildren: () => import( "./website/website.module" ).then( m => m.WebsiteModule )
  },
  {
    path: "",
    canActivate: [ AuthGuard ],
    canLoad: [ AuthGuard ],
    loadChildren: () => import( "./admin/admin.module" ).then( m => m.AdminModule ),
  },
  {
    path: "**",
    redirectTo: "home",
  },
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
