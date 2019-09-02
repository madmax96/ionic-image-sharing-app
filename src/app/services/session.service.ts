import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
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
  constructor(private http: HttpClient, private storage: Storage) { }

  createSession(data) {
    return this.http
    .post(`${this.API_URL}/session`,data, {...this.baseHttpOptions, observe:'response'})
    .toPromise()
    .then((response:any) => {
      const authToken = response.headers.get('Auth-Token');
      this.storage.set('auth_token', authToken);
      this.authToken = authToken
      this.authUser = response.body;
      this.authUser.profile_picture = this.authUser.profile_picture && `${this.API_URL}/images/${this.authUser.profile_picture}?auth-token=${this.authToken}`
    })
   }

  getSession(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Auth-Token': token,
      })
    };
    return this.http.get(`${this.API_URL}/session`,httpOptions)
    .toPromise()
    .then((response:any) => {
      this.authToken = token;
      this.authUser = response;
      this.authUser.profile_picture = this.authUser.profile_picture && `${this.API_URL}/images/${this.authUser.profile_picture}?auth-token=${this.authToken}`
    })
    .catch(err => {
      console.log(err)
      return Promise.reject(err);
    });
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
}
