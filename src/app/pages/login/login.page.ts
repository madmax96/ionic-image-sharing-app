import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginError:boolean = false;
  constructor(private sessionService: SessionService,private navCtrl: NavController) { }

  ngOnInit() {
  }

  login(form: NgForm){

    const data = JSON.stringify(form.value);
    this.sessionService.createSession(data)
    .then(() => {
      // go to home page
      this.navCtrl.navigateForward('/app/home');
    })
    .catch(err => {
      // show err message
      this.loginError= true;
    })
  }
}

