import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  constructor(
    private data: DataService,
    private router: Router,
    private rest: RestApiService
  ) { }

  ngOnInit() {
    this.rest.get('http://localhost:3030/api/newTask')
      .then(data => {
        console.log(data);
        if (data) {
          console.log(`/task/${data['taskId']}`);
          this.router.navigate([`/task/${data['taskId']}`]);
        } else {
          this.data.error(data['message']);
          this.router.navigate(['']);
        }
      })
      .catch(error => this.data.error(error));
       
  }

}
