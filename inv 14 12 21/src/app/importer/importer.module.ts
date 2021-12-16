import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImporterPageRoutingModule } from './importer-routing.module';

import { ImporterPage } from './importer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImporterPageRoutingModule
  ],
  declarations: [ImporterPage]
})
export class ImporterPageModule {}
