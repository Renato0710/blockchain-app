import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ProvProvider } from '../../providers/prov/prov';
import { Title } from '@angular/platform-browser/src/browser/title';
import { Subject } from 'rxjs/Subject';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@IonicPage()
@Component({
  selector: 'page-solicitudes-recividas',
  templateUrl: 'solicitudes-recividas.html',
})
export class SolicitudesRecividasPage {

  user;
  solicitudes = [];
  tx = { peticion : '', nuevoEstado : ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public prov : ProvProvider, public alertCtrl : AlertController, public loadCtrl : LoadingController) {
    this.user = navParams.get('user');
    var loader = loadCtrl.create({ content : 'Cargando...'});
    loader.present();
    prov.listarPeticiones().subscribe(
      data=>{
        this.solicitudes = [];
        data.forEach(solicitud => {
          if(solicitud.receptor.substr(33) == this.user.dni)
          this.solicitudes.push(solicitud);
        });
      },
      error=>console.log(error),
      ()=>loader.dismiss()
    );
  }

  info(s){
    if(s.estado == 'pendiente'){
      this.tx.peticion = 'resource:org.acme.sample.Peticion#' + s.id
      var alert = this.alertCtrl.create({
      title : 'Informacion de la solicitud',
      message : 'ID: ' + s.id + "<br\>" + 'Emisor: ' + s.emisor.substr(33) + "<br\>" + 'Propiedad: ' + s.propiedad.substr(35) + "<br\>" + 'Estado: ' + s.estado,
      buttons: [
        {
          text: 'Rechazar',
          handler: () => {
            var loader = this.loadCtrl.create({ content : 'Rechazando...'});
            loader.present();
            this.tx.nuevoEstado = 'rechazado';
            this.prov.responderSolicitud(this.tx).subscribe(()=>{
              this.prov.listarPeticiones().subscribe(
                data=>{
                  this.solicitudes = [];
                  data.forEach(solicitud => {
                    if(solicitud.receptor.substr(33) == this.user.dni)
                    this.solicitudes.push(solicitud);
                  });
                },
                error=>console.log(error),
                ()=>loader.dismiss()
              );
              var al = this.alertCtrl.create({
                title : 'Exito',
                subTitle : 'Se rechazo correctamente'
              });
              al.present();
            });
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            var loader = this.loadCtrl.create({ content : 'Aceptando...'});
            loader.present();
            this.tx.nuevoEstado = 'aceptado';
            this.prov.responderSolicitud(this.tx).subscribe(()=>{
              this.prov.listarPeticiones().subscribe(
                data=>{
                  this.solicitudes = [];
                  data.forEach(solicitud => {
                    if(solicitud.receptor.substr(33) == this.user.dni)
                    this.solicitudes.push(solicitud);
                  });
                },
                error=>console.log(error),
                ()=>loader.dismiss()
              );
              var al = this.alertCtrl.create({
                title : 'Exito',
                subTitle : 'Se acepto correctamente'
              });
              al.present();
            });
          }
        }
      ]
      });
    alert.present();
    }else{
      var alert = this.alertCtrl.create({
        title : 'Informacion de la solicitud',
        message : 'ID: ' + s.id + "<br\>" + 'Emisor: ' + s.emisor.substr(33) + "<br\>" + 'Propiedad: ' + s.propiedad.substr(35) + "<br\>" + 'Estado: ' + s.estado
      });
      alert.present();
    }
    
  }

}
