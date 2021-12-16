import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LirePageRoutingModule } from './lire-routing.module';

import { LirePage } from './lire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LirePageRoutingModule
  ],
  declarations: [LirePage]
})
export class LirePageModule {}
