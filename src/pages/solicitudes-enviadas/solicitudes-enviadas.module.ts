import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolicitudesEnviadasPage } from './solicitudes-enviadas';

@NgModule({
  declarations: [
    SolicitudesEnviadasPage,
  ],
  imports: [
    IonicPageModule.forChild(SolicitudesEnviadasPage),
  ],
})
export class SolicitudesEnviadasPageModule {}
