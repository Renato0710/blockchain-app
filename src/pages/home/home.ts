import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { CrearCuentaPage } from '../crear-cuenta/crear-cuenta';
import { ProvProvider } from '../../providers/prov/prov';
import { MenuPage } from '../menu/menu';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  dni : string;
  clave : string;
  user = null;
  constructor(public navCtrl: NavController, public prov : ProvProvider, public alertCtrl : AlertController, public loadCtrl : LoadingController) {

  }

  iniciarSesion(){
    var loader = this.loadCtrl.create({ content : 'Iniciando...' });
    loader.present();
    this.prov.listarUsuarios().subscribe(
      data =>{
        data.forEach(usuario =>{
          if(usuario.dni == this.dni && usuario.clave == this.clave)
            this.user = usuario;
        });
      },
      error=>console.log(error),
      ()=>{
        if(this.user != null){
          loader.dismiss();
          this.navCtrl.push(MenuPage,{ user : this.user });
        }else{
          loader.dismiss();
          var alert = this.alertCtrl.create({
            title : 'Error',
            subTitle : 'Error de inicio de sesion, verifique bien los datos.'
          });
          alert.present();
        }
      }
    );
  }
  
  crearCuenta(){
    this.navCtrl.push(CrearCuentaPage);
  }

}
