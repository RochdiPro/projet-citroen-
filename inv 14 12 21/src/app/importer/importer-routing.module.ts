import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImporterPage } from './importer.page';

const routes: Routes = [
  {
    path: '',
    component: ImporterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImporterPageRoutingModule {}
