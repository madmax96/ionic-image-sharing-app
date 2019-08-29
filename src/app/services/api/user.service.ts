import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  constructor(private http: HttpClient) { }

  createUser(userData){
    return this.http.post('http://localhost:3000/user',userData, this.baseHttpOptions)
  }

  checkUsername(username){
    return this.http.get(`http://localhost:3000/user/check-username?username=${username}`)
  }
}
