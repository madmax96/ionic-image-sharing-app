import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/api/user.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-chat-tab',
  templateUrl: './chat-tab.page.html',
  styleUrls: ['./chat-tab.page.scss'],
})
export class ChatTabPage implements OnInit {

  subscribers:any = []
  constructor(private UserService: UserService,
              private WebsocketService: WebsocketService,
              private Router: Router) { }

  ngOnInit() {
    this.UserService.getSubscribers().then(results => {
      this.subscribers = results;
    })
    this.WebsocketService.on('New Message',function(data) {
      console.log('New Message',data);
    })
  }

  openChat(user:any) {

    this.UserService.getAllChatMessages(user).then((messages)=>{
      const navigationExtras: NavigationExtras = {
        state: {
          user,
          messages
        }
      }
    this.Router.navigate(['app','chat-window'], navigationExtras);
    }).catch((err)=> {
      console.error(err);
      alert('Something went wrong.Please try later');
    })
  }
}
