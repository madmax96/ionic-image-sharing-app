import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './services/api/user.service';
import { SessionService } from './services/session.service'
import { WebsocketService } from './services/websocket.service'
import { ImageService } from './services/api/image.service'

import { IonicStorageModule } from '@ionic/storage';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule,IonicModule.forRoot(),IonicStorageModule.forRoot(), AppRoutingModule,ComponentsModule],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    SessionService,
    WebsocketService,
    ImageService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
