import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  registeredEvents = {}
  socket: WebSocket = null;
  isOpen:boolean = false
  constructor() { }

  connect(token:string) {
    if (this.isOpen) return Promise.resolve();
    return new Promise((res, rej) => {
      try {
        this.socket = new WebSocket(`${environment.WS_URL}?auth-token=${token}`);
      } catch (e) {
        rej(e);
      }
      this.socket.onerror = (e) => {
        this.isOpen = false;
        rej(e);
      };
      this.socket.onopen = () => {
        this.isOpen=true;
        this.socket.onmessage = (message) => {
          const messageData = JSON.parse(message.data);
          console.log("received message data, ", messageData);
          const { data, event } = messageData;
          if (this.registeredEvents[event]) {
            this.registeredEvents[event](data);
          }
        };
        this.socket.onclose = () => {
          this.isOpen = false;
          console.log('Connection closed by server!');
        };
        window.onunload = () => {
          this.closeConnection();
        };
        res();
      };
    });
  }

  on(event, callback) {
    this.registeredEvents[event] = callback;
  }

  emmit(event, data) {
    this.socket.send(JSON.stringify({ event, data }));
  }

  closeConnection() {
    this.isOpen = false;
    this.socket.close();
  }
}
