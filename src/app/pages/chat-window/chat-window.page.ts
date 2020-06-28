import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.page.html',
  styleUrls: ['./chat-window.page.scss'],
})
export class ChatWindowPage implements OnInit {

  data:any = {
    messages: [],
    user: {}
  }
  sessionUser:any;
  textMessage:string;
  content: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private SessionService: SessionService,
              private WebsocketService: WebsocketService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        const state = this.router.getCurrentNavigation().extras.state;
        this.data = state;
      }
    });
    this.sessionUser = SessionService.getUser()
    WebsocketService.on('New Message',(data) => this.receiveMessage(data))
    WebsocketService.on('Message Seen',(data) => this.handleMessageSeen(data))
    setTimeout(()=>{
      this.myContent.scrollToBottom(100);
    },300)
  }

  @ViewChild(IonContent, {read: IonContent, static: false}) myContent: IonContent;

  ngOnInit() {

  }

  sendTextMessage() {
    if (!this.textMessage) return;
    const messageData = {
      content:this.textMessage,
      type: 'text',
      receiverUserId: this.data.user.id
    }
    this.data.messages.push({
     ...messageData,
      createdAt: (new Date()).toUTCString(),
      self:true
    });
    this.WebsocketService.emmit('New Message',messageData)
    this.textMessage = '';
    setTimeout(()=>{
      this.myContent.scrollToBottom(100);
    },100)
  }

  receiveMessage(data) {
    this.data.messages.push({
      createdAt: (new Date()).toUTCString(),
      ...data
    })

    setTimeout(()=>{
      this.myContent.scrollToBottom(100);
    },100)
  }

  emmitSeen(){
    const receivedUnseenMessages = this.data.messages.filter((message)=> !message.seen && !message.self)
    receivedUnseenMessages.forEach(message=>{
      this.WebsocketService.emmit('Message Seen', { messageId:message.id, senderUserId: this.data.user.id })
      message.seen = true;
    })
  }
  handleMessageSeen(data){
    this.data.messages.forEach((message)=>{
      if (message.self){
        message.seen = true;
      }
    })
  }

  async onMessageImageSelected($event) {
    let [image] = $event.target.files;
    const messageBase64Image= await this.encodeImageFileAsURL(image);
    const messageData = {
      content: messageBase64Image,
      type: 'image',
      receiverUserId: this.data.user.id
    }
    this.data.messages.push({
     ...messageData,
      createdAt: (new Date()).toUTCString(),
      self:true
    });
    this.WebsocketService.emmit('New Message',messageData);
    this.clearFileInput('messageImageInput');
    setTimeout(()=>{
      this.myContent.scrollToBottom(100);
    },100)
  }

  encodeImageFileAsURL(file:File):Promise<any>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((res) => {
      reader.onloadend = function onloadend() {
        res(reader.result);
      };
    });
  }

  clearFileInput(elementId){
    const input: any = document.getElementById(elementId);
    input.value= '';
  }
  openFileBrowser(elementId){
    document.getElementById(elementId).click();
  }
}
