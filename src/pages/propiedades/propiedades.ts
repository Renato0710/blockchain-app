import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ProvProvider } from '../../providers/prov/prov';
import uuid from 'uuid4';

@IonicPage()
@Component({
  selector: 'page-propiedades',
  templateUrl: 'propiedades.html',
})
export class PropiedadesPage {

  user;
  objetos
  propiedad = { id : '', nombre : '', descripcion : '', persona : ''};
  propiedades = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public prov : ProvProvider, public loadCtrl : LoadingController, public alertCtrl : AlertController) {
    var loader = loadCtrl.create({ content : 'Cargando...'});
    loader.present();
    this.user = navParams.get('user');
    this.propiedad.persona = 'resource:org.acme.sample.Persona#' + this.user.dni;
    this.prov.listarPropiedades().subscribe(
      data=>{
        this.propiedades = [];
        data.forEach( propiedad => {
          if(propiedad.persona.substr(33) == this.user.dni)
          this.propiedades.push(propiedad);
        });
      },
      error=>console.log(error),
      ()=>loader.dismiss()
    );
  }

  info(p){
    var alert = this.alertCtrl.create({
      title : 'Informacion de la propiedad',
      message : 'ID: ' + p.id + "<br\>" + 'Nombre: ' + p.nombre + "<br\>" + 'Descripcion: ' + p.descripcion   
    });
    alert.present();
  }

  registrar(){
    if(this.propiedad.nombre != ''){
      var loader = this.loadCtrl.create({ content : 'Registrando...'});
      loader.present();
      this.propiedad.id = uuid();
      this.prov.registrarPropiedad(this.propiedad).subscribe(
        ()=>{
          this.prov.listarPropiedades().subscribe(
            data=>{
              this.propiedades = [];
              data.forEach( propiedad => {
                if(propiedad.persona.substr(33) == this.user.dni)
                  this.propiedades.push(propiedad);
              });
            },
            error=>console.log(error),
            ()=>{
              loader.dismiss();
              this.propiedad.id = '';
              this.propiedad.nombre = '';
              this.propiedad.descripcion = '';
            }
          );
        }
      );
    }else{
      var alert = this.alertCtrl.create({
        title : 'Error',
        subTitle : 'El ID y Nombre no pueden ir vacios, verifique por favor.'
      });
      alert.present();
    }
  }

}
