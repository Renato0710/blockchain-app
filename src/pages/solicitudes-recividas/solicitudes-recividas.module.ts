import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolicitudesRecividasPage } from './solicitudes-recividas';

@NgModule({
  declarations: [
    SolicitudesRecividasPage,
  ],
  imports: [
    IonicPageModule.forChild(SolicitudesRecividasPage),
  ],
})
export class SolicitudesRecividasPageModule {}
