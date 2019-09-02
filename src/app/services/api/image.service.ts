import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {SessionService} from '../session.service';
import {environment} from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ImageService {
  baseHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };
  API_URL:string = environment.API_URL
  constructor(private http: HttpClient, private sessionService: SessionService) {

  }

  uploadProfileImage(base64Image: string){
    const data = {
        base64Image
    }
    const token = this.sessionService.getToken();
    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Auth-Token': token
          })
    }
    return this.http
    .patch(`${this.API_URL}/user`,data, httpOptions)
    .toPromise()
    .then(user=>{
      user.profile_picture = `${this.API_URL}/images/${user.profile_picture}?auth-token=${token}`;
      this.sessionService.setUser(user);
      return user;
    });
  }
}
