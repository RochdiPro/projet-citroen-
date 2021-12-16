import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExporterPageRoutingModule } from './exporter-routing.module';

import { ExporterPage } from './exporter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExporterPageRoutingModule
  ],
  declarations: [ExporterPage]
})
export class ExporterPageModule {}
