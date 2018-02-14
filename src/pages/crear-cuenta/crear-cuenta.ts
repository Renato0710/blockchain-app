import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { ProvProvider } from '../../providers/prov/prov';

@IonicPage()
@Component({
  selector: 'page-crear-cuenta',
  templateUrl: 'crear-cuenta.html',
})
export class CrearCuentaPage {

  user = { dni : '', clave : '', clave2 : '' , nombre : ''};

  constructor(public navCtrl: NavController, public prov : ProvProvider, public loadCtrl : LoadingController, public alertCtrl : AlertController) {
  }

  public limpiarUser(){
    this.user.dni = '';
    this.user.clave = '';
    this.user.clave2 = '';
    this.user.nombre = '';
  }

  crearCuenta(){
    if( this.user.dni != '' && this.user.clave != '' && this.user.clave == this.user.clave2 && this.user.nombre ){
      var load = this.loadCtrl.create({ content : 'Cargando...' });
      load.present();
      this.prov.crearCuenta(this.user).subscribe(()=>{
        var alert = this.alertCtrl.create({
          title : 'Ok',
          subTitle : 'Se creo correctamente su usuario.'
        });
        alert.present();
        load.dismiss();
        this.limpiarUser();
      });
    }else{
      var alert = this.alertCtrl.create({
        title : 'Error',
        subTitle : 'Verifique bien los datos.'
      });
      alert.present();
    }
  }

}
