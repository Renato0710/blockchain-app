import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { PeticionesPage } from '../peticiones/peticiones';
import { PropiedadesPage } from '../propiedades/propiedades';
import { SolicitudesPage } from '../solicitudes/solicitudes';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  user;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl : AlertController) {
    this.user = this.navParams.get('user');
  }

  propiedades(){
    this.navCtrl.push(PropiedadesPage, { user : this.user });
  }

  peticiones(){
    this.navCtrl.push(PeticionesPage, { user : this.user });
  }

  solicitudes(){
    this.navCtrl.push(SolicitudesPage, { user : this.user });
  }

  cerrarSesion(){
    var alert = this.alertCtrl.create({
      title : 'Seguro que desea cerrar sesion?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Si',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    alert.present();
  }

}
