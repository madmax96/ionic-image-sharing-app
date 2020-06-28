import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {SessionService} from '../session.service';

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

  constructor(private http: HttpClient, private sessionService: SessionService) { }

  createUser(userData){
    return this.http.post(`${this.API_URL}/user`,userData, this.baseHttpOptions)
    .toPromise()
  }

  checkUsername(username){
    return this.http.get(`${this.API_URL}/user/check-username?username=${username}`)
    .toPromise()
  }

  getSubscribers(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Auth-Token': this.sessionService.getToken()
      })
    }
    return this.http.get(`${this.API_URL}/subscribers`, httpOptions)
    .toPromise()
    .then((subscribers:Array<any>)=>{
      subscribers.forEach(sub=>{
        if (sub.profile_picture){
          sub.profile_picture = `${this.API_URL}/images/${sub.profile_picture}?auth-token=${this.sessionService.getToken()}`
        } else {
          sub.profile_picture = '/assets/user-placeholder.png'
        }
      })
      return subscribers;
    })
  }

  async getAllChatMessages(user) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Auth-Token': this.sessionService.getToken()
      })
    }
   const messages: any = await this.http.get(`${this.API_URL}/messages/${user.id}`, httpOptions)
    .toPromise()
    messages.forEach((message)=>{
      if (message.sender_user_id === this.sessionService.getUser().id){
        message.self=true
      }
      if (message.type==='image'){
        message.content = `${this.API_URL}/images/${message.content}?auth-token=${this.sessionService.getToken()}`
      }
      message.createdAt = (new Date(message.created_at)).toUTCString()
    })
    return messages;
  }
}
