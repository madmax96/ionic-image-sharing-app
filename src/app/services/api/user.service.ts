import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  API_URL:string = environment.API_URL

  constructor(private http: HttpClient) { }

  createUser(userData){
    return this.http.post(`${this.API_URL}/user`,userData, this.baseHttpOptions)
    .toPromise()
  }

  checkUsername(username){
    return this.http.get(`${this.API_URL}/user/check-username?username=${username}`)
    .toPromise()
  }
}
