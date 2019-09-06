import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {SessionService} from '../session.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseHttpHeaders:any;
  API_URL:string = environment.API_URL

  constructor(private http: HttpClient,private sessionService: SessionService) {
    this.baseHttpHeaders = {
        'Content-Type':  'application/json',
    };
   }

  createPost(data){
    const httpOptions = {
      headers: new HttpHeaders({
        ...this.baseHttpHeaders,
        'Auth-Token':this.sessionService.getToken()
      })
    }
    const user = this.sessionService.getUser();
    const token = this.sessionService.getToken();

    return this.http.post(`${this.API_URL}/posts`,JSON.stringify(data),httpOptions)
    .toPromise()
    .then((post:any)=>{
      post.user = user;
      post.image_url = `${this.API_URL}/images/${post.image_filename}?auth-token=${token}`;
      post.likes = [];
      return post;
    });
  }

  deletePost(postId){
    const httpOptions = {
      headers: new HttpHeaders({
        'Auth-Token':this.sessionService.getToken()
      })
    }
    return this.http.delete(`${this.API_URL}/posts/${postId}`, httpOptions)
    .toPromise();
  }

  getUserPosts() {
    const httpOptions = {
      headers: new HttpHeaders({
        ...this.baseHttpHeaders,
        'Auth-Token':this.sessionService.getToken()
      })
    }

    const user = this.sessionService.getUser();
    const token = this.sessionService.getToken();
    return this.http.get(`${this.API_URL}/posts/${user.id}`,httpOptions)
    .toPromise()
    .then((posts:Array<any>) => {
      posts.forEach(post => {
        post.image_url = `${this.API_URL}/images/${post.image_filename}?auth-token=${token}`;
        post.user = user;
        post.likes = post.likes && post.likes.split(',').map(Number);
      });
      return posts;
    })
  }

  getAllPosts() {
    const httpOptions = {
      headers: new HttpHeaders({
        ...this.baseHttpHeaders,
        'Auth-Token':this.sessionService.getToken()
      })
    }
    const token = this.sessionService.getToken();
    return this.http.get(`${this.API_URL}/posts`,httpOptions)
    .toPromise()
    .then((posts:Array<any>) => {
      posts.forEach(post => {
        post.image_url = `${this.API_URL}/images/${post.image_filename}?auth-token=${token}`;
        post.user = {
          username:post.username,
          id:post.user_id,
          profile_picture: post.profile_picture && `${this.API_URL}/images/${post.profile_picture}?auth-token=${token}`
        }
        post.likes = post.likes && post.likes.split(',').map(Number)
      });
      return posts;
    })
  }

  likePost(postId){
    const httpOptions = {
      headers: new HttpHeaders({
        ...this.baseHttpHeaders,
        'Auth-Token':this.sessionService.getToken()
      })
    }
    return this.http.post(`${this.API_URL}/likes/${postId}`,null,httpOptions)
    .toPromise();
  }

  getStats(){
    const httpOptions = {
      headers: new HttpHeaders({
        ...this.baseHttpHeaders,
        'Auth-Token':this.sessionService.getToken()
      })
    }
    return this.http.get(`${this.API_URL}/stats/posts`, httpOptions)
    .toPromise()
  }
}
