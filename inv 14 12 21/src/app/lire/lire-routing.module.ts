import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LirePage } from './lire.page';

const routes: Routes = [
  {
    path: '',
    component: LirePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LirePageRoutingModule {}
