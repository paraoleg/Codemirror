import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private router: Router,
    private data: DataService
  ) {
    this.data.getProfile();
  }
  get token() {
    return localStorage.getItem('token');
  }
  
 
}
