import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ProvProvider } from '../../providers/prov/prov';

@IonicPage()
@Component({
  selector: 'page-solicitudes-enviadas',
  templateUrl: 'solicitudes-enviadas.html',
})
export class SolicitudesEnviadasPage {

  user;
  solicitudes = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadCtrl : LoadingController, public prov : ProvProvider, public alertCtrl : AlertController) {
    this.user = this.navParams.get('user');
    var loader = loadCtrl.create({ content : 'Cargando...'});
    loader.present();
    prov.listarPeticiones().subscribe(
      data=>{
        this.solicitudes = [];
        data.forEach(solicitud => {
          if(solicitud.emisor.substr(33) == this.user.dni)
          this.solicitudes.push(solicitud);
        });
      },
      error=>console.log(error),
      ()=>loader.dismiss()
    );
  }

  info(s){
    var alert = this.alertCtrl.create({
      title : 'Informacion de la solicitud',
      message : 'ID: ' + s.id + "<br\>" + 'Receptor: ' + s.receptor.substr(33) + "<br\>" + 'Propiedad: ' + s.propiedad.substr(35) + "<br\>" + 'Estado: ' + s.estado
    });
    alert.present();
  }

}
