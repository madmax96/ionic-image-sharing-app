import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from 'src/app/services/api/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  sendingRequest: Boolean = false;
  success: Boolean = null;
  usernameAvailable: Boolean = true

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.sendingRequest = false;
    this.success = null;
  }
  ionViewWillEnter(){
    this.sendingRequest = false;
    this.success = null;
  }
  register(form: NgForm) {
    this.sendingRequest = true;
    const {confirm, ...dataToSend} = form.value
    const data = JSON.stringify(dataToSend);

    this.userService.createUser(data)
      .subscribe(() => {
        this.sendingRequest = false;
        this.success=true;
      }, err => {
        this.sendingRequest = false;
        this.success = false
      })
  }

  checkUsername(username){
    if(!username) return;
    this.userService.checkUsername(username)
      .subscribe((data: {available:Boolean}) => {
          this.usernameAvailable=data.available;
      }, err => {})
  }
}
