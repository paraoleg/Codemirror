import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '../environments/environment';

@Injectable()
export class WebsocketService {
  socket = io('http://localhost:3000');
  constructor() { }

  ngOnInit() { }
 
  joinRoom(data){
    this.socket.emit('join', data)
  }

  sendMessage(data){
    this.socket.emit('newMessage', data);
  }

  newMessageRecieved(){
    let observable = new Observable<{id: string, author:string, text:string, date: string}>(observer => {
      this.socket.on('newMessage', data => {
        observer.next(data);
      })
      return () => {this.socket.disconnect();}
    })
  
    return observable;
  }

  editorChange(){
    let observable = new Observable(observer => {
      this.socket.on('doc', obj => {
        observer.next(obj);
      })
      return () => {this.socket.disconnect();}
    })
  
    return observable;
  }
}
