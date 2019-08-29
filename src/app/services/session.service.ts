import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  baseHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  authToken:string = null;
  authUser:any = null;
  constructor(private http: HttpClient) { }

  createSession(data){
    return this.http
    .post('http://localhost:3000/session',data, {...this.baseHttpOptions, observe:'response'})
    .toPromise()
    .then(response => {
      this.authToken = response.headers.get('Auth-Token')
      this.authUser = response.body;
    })
   }
   getUser(){return this.authUser}
   getToken(){return this.authToken}
}
