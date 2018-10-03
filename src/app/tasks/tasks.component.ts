import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: any;

  constructor(private restApi: RestApiService) { }

  async ngOnInit() {
    try{
      const data = await this.restApi.get('http://localhost:3030/api')
      data['success']
        ? this.tasks = data['tasks']
        : console.log(data);
    } catch (error) {
      console.log(error);
    }
    
  }

}
