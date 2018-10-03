import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WebsocketService } from '../websocket.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  task: Object;
  roomId: String;
  messageText: String;
  messages: Array<Object> = [];

  constructor (
    private rest: RestApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private socket: WebsocketService,
    private data: DataService
  ) { 

    this.socket.newMessageRecieved()
    .subscribe(data => {
      console.log(data);
      let newMessage = {
        text: data.text,
        author: data.author,
        date: data.date
      };

      this.messages.push(newMessage);
    })

   }

  ngOnInit() {
    this.activatedRoute.params.subscribe(res => {
      this.rest.get(`http://localhost:3030/api/task/${res['id']}`)
        .then(data => {
          data['success']
            ? this.task = data['task']
            : this.router.navigate(['/']);
          this.join();
        })
        .catch (error => console.log(error));
    });
  }

  join(){
    this.socket.joinRoom({
      username: this.data.user.name, 
      room: this.task['_id']
    });
  }

  sendMessage(){
    let date = new Date().toLocaleString('en-US', { 
      hour: 'numeric', 
      minute: 'numeric',
      hour12: true 
    });
  
    this.socket.sendMessage({
      id: this.task['_id'],
      author: this.data.user.name,
      text: this.messageText,
      date: date
    })
    console.log({
      'id': this.task['_id'],
      'author': this.data.user.name,
      'text': this.messageText,
      'date': date
    });

    this.messageText = '';
  }

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.sendMessage();
    }
  }

 

}
