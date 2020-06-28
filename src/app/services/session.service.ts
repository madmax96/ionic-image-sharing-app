import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import {WebsocketService} from './websocket.service'
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  baseHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  API_URL:string = environment.API_URL
  private authToken:string = null;
  private authUser:any = null;
  constructor(private http: HttpClient, private storage: Storage, private WebsocketService: WebsocketService) { }

  async createSession(data) {

    const response = await this.http
                    .post(`${this.API_URL}/session`,data, {...this.baseHttpOptions, observe:'response'})
                    .toPromise();

    const authToken = response.headers.get('Auth-Token');
    this.storage.set('auth_token', authToken);
    this.authToken = authToken
    this.authUser = response.body;
    this.authUser.profile_picture = this.authUser.profile_picture && `${this.API_URL}/images/${this.authUser.profile_picture}?auth-token=${this.authToken}`
    await this.connectToWebsocket();
   }

  async getSession(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Auth-Token': token,
      })
    };
    try {
      const response = await this.http.get(`${this.API_URL}/session`,httpOptions)
      .toPromise();
      this.authToken = token;
      this.authUser = response;
      this.authUser.profile_picture = this.authUser.profile_picture && `${this.API_URL}/images/${this.authUser.profile_picture}?auth-token=${this.authToken}`
      await this.connectToWebsocket();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async destroy() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Auth-Token': this.authToken,
      })
    };
    await this.http.delete(`${this.API_URL}/session`,httpOptions)
    .toPromise();
    this.authToken = null;
    this.authUser = null;
    return this.storage.remove('auth_token');
  }

  getUser(){return this.authUser}

  setUser(user){
    // changing with mutation to propagate changes to all components
    Object.getOwnPropertyNames(this.authUser)
    .forEach(key=>{
      if (user[key]){
        this.authUser[key] = user[key]
      }
    });
  }
  getToken(){return this.authToken}

  connectToWebsocket() {
    return this.WebsocketService.connect(this.getToken());
  }
}
