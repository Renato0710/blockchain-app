import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { HomePage } from '../pages/home/home';
import { CrearCuentaPage } from '../pages/crear-cuenta/crear-cuenta';
import { MenuPage } from '../pages/menu/menu';
import { PeticionesPage } from '../pages/peticiones/peticiones';
import { PropiedadesPage } from '../pages/propiedades/propiedades';
import { SolicitudesPage } from '../pages/solicitudes/solicitudes';
import { SolicitudesEnviadasPage } from '../pages/solicitudes-enviadas/solicitudes-enviadas';
import { SolicitudesRecividasPage } from '../pages/solicitudes-recividas/solicitudes-recividas';
import { ProvProvider } from '../providers/prov/prov';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CrearCuentaPage,
    MenuPage,
    PeticionesPage,
    PropiedadesPage,
    SolicitudesPage,
    SolicitudesEnviadasPage,
    SolicitudesRecividasPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CrearCuentaPage,
    MenuPage,
    PeticionesPage,
    PropiedadesPage,
    SolicitudesPage,
    SolicitudesRecividasPage,
    SolicitudesEnviadasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProvProvider
  ]
})
export class AppModule {}
