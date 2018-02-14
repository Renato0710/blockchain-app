import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ProvProvider {

  url = 'http://184.172.229.143:31090/api/';

  constructor(public http: Http) {
  }

  crearCuenta(cuenta){
    return this.http.post(this.url + 'Persona', cuenta)
    .map((res : Response) => res.json());
  }

  listarUsuarios(){
    return this.http.get(this.url + 'Persona')
    .map((res : Response) => res.json());
  }

  listarPropiedades(){
    return this.http.get(this.url + 'Propiedad')
    .map((res : Response) => res.json());
  }

  registrarPropiedad(propiedad){
    return this.http.post(this.url + 'Propiedad', propiedad)
    .map((res : Response) => res.json());
  }

  registrarPeticion(peticion){
    return this.http.post(this.url + 'Peticion', peticion)
    .map((res : Response) => res.json());
  }

  listarPeticiones(){
    return this.http.get(this.url + 'Peticion')
    .map((res : Response) => res.json());
  }

  responderSolicitud(tx){
    return this.http.post(this.url + 'responderTransferencia', tx)
    .map((res : Response) => res.json());
  }

}
