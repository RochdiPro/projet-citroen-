import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListerPageRoutingModule } from './lister-routing.module';

import { ListerPage } from './lister.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListerPageRoutingModule
  ],
  declarations: [ListerPage]
})
export class ListerPageModule {}
