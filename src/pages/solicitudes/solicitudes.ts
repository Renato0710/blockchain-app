import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SolicitudesEnviadasPage } from '../solicitudes-enviadas/solicitudes-enviadas';
import { SolicitudesRecividasPage } from '../solicitudes-recividas/solicitudes-recividas';

@IonicPage()
@Component({
  selector: 'page-solicitudes',
  templateUrl: 'solicitudes.html',
})
export class SolicitudesPage {

  user;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = navParams.get('user');
  }

  solicitudesEnviadas(){
    this.navCtrl.push(SolicitudesEnviadasPage, { user : this.user });
  }

  solicitudesRecividas(){
    this.navCtrl.push(SolicitudesRecividasPage, { user : this.user });
  }

}
