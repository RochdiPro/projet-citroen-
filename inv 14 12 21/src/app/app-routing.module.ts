import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'lire',
    loadChildren: () => import('./lire/lire.module').then( m => m.LirePageModule)
  },
  {
    path: 'lister',
    loadChildren: () => import('./lister/lister.module').then( m => m.ListerPageModule)
  },
  {
    path: 'exporter',
    loadChildren: () => import('./exporter/exporter.module').then( m => m.ExporterPageModule)
  },
  {
    path: 'config',
    loadChildren: () => import('./config/config.module').then( m => m.ConfigPageModule)
  },
  {
    path: 'importer',
    loadChildren: () => import('./importer/importer.module').then( m => m.ImporterPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
