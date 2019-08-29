import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
  }

  login(form: NgForm){

    const data = JSON.stringify(form.value);
    this.sessionService.createSession(data)
    .then(() =>{
      // go to home page
    })
    .catch(err=>{
      // show err message
    })
  }
}
