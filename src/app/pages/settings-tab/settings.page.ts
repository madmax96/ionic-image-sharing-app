import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SessionService } from 'src/app/services/session.service';
import { PostService } from 'src/app/services/api/post.service';

@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss']
})
export class SettingsPage {

  stats:any = {}
  constructor(private navCtrl:NavController,private sessionService: SessionService, private postService:PostService) {}

  ionViewWillEnter(){
   this.postService.getStats()
   .then((data)=>{
    this.stats = data;
   })
   .catch(()=>{
     alert('Something is wrong, please try again later');
   })
  }
  handleLogout() {
    this.sessionService.destroy()
    .then(()=>{
      this.navCtrl.navigateForward('login');
    })
    .catch(()=>{
      alert('Logout error, please try again');
    })
  }
}
