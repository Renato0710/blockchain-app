import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PeticionesPage } from './peticiones';

@NgModule({
  declarations: [
    PeticionesPage,
  ],
  imports: [
    IonicPageModule.forChild(PeticionesPage),
  ],
})
export class PeticionesPageModule {}
