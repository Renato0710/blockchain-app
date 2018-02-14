import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ProvProvider } from '../../providers/prov/prov';
import uuid from 'uuid4';

@IonicPage()
@Component({
  selector: 'page-peticiones',
  templateUrl: 'peticiones.html',
})
export class PeticionesPage {

  user;
  peticion = { id : '', propiedad : '', emisor : '', receptor : '', estado : '' };
  propiedadID;
  personaID = '';
  propiedades = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public prov : ProvProvider, public loadCtrl : LoadingController, public alertCtrl : AlertController) {
    var loader = loadCtrl.create({ content : 'Cargando...' });
    loader.present();
    this.user = navParams.get('user');
    this.peticion.emisor = 'resource:org.acme.sample.Persona#' + this.user.dni;
    this.peticion.estado = 'pendiente';
    prov.listarPropiedades().subscribe(
      data => {
        this.propiedades = [];
        data.forEach(propiedad => {
          if(propiedad.persona.substr(33) == this.user.dni)
            this.propiedades.push(propiedad);
        });
      },
      error =>console.log(error),
      () => loader.dismiss()
    );
  }

  emitirPeticion(){
    if(this.user.dni == this.personaID){
      var alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'El DNI ingresado no puede ser el mismo que el emisor'
      });
      alert.present();
    }
    
    if(this.propiedadID != '' && this.personaID != '' && this.user.dni != this.personaID){
      var loader = this.loadCtrl.create({ content : 'Emitiendo...' });
      loader.present();
      this.peticion.id = uuid();
      this.peticion.propiedad = 'resource:org.acme.sample.Propiedad#' + this.propiedadID;
      this.peticion.receptor = 'resource:org.acme.sample.Persona#' + this.personaID;
      this.prov.registrarPeticion(this.peticion).subscribe(
        ()=>{
          loader.dismiss();
          var alert = this.alertCtrl.create({
            title : 'Exito',
            subTitle : 'Se registro su peticion correctamente.'
          });
          alert.present();
          this.peticion.id = '';
          this.peticion.receptor = '';
          this.peticion.propiedad = '';
        }
      );
    }else{
      var alert = this.alertCtrl.create({
        title : 'Error',
        subTitle : 'Verifique bien los datos'
      });
      alert.present();
    }
  }

}
