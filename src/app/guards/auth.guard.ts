import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {SessionService} from '../services/session.service';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private sessionService: SessionService,
    private storage: Storage, private navCtrl: NavController,
    private router: Router){}
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  Promise<boolean | UrlTree> {

    // Get the current authentication state from a Service!
    let userAuthenticated = this.sessionService.getToken() && this.sessionService.getUser();
    if(userAuthenticated) return true;
    const authToken = await this.storage.get('auth_token');
    if (!authToken) {
      return this.router.parseUrl('login')
    }
    try {
      await this.sessionService.getSession(authToken);
      return true;
    } catch (err) {
      return this.router.parseUrl('login')
    }
  }
}
