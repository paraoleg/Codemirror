import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { RestApiService } from './rest-api.service';

@Injectable()
export class DataService {
  message = '';
  messageType = 'danger';

  user: any;
  cartItems= 0;

  constructor(private router: Router, private rest: RestApiService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.message = '';
      }
    });
  }

  error(message) {
    this.messageType = 'danger';
    this.message = message;
  }

  success(message) {
    this.messageType = 'success';
    this.message = message;
  }

  warning(message) {
    this.messageType = 'warning';
    this.message = message;
  }
  async getProfile() {
    try {
      if (localStorage.getItem('token')) {
        const data = await this.rest.get(
          'http://localhost:3030/api/auth/profile'
        );
        data['success'] 
          ? this.user = data['user']
          : this.logout();
      }
    } catch (error) {
      this.error(error);
    }
  }

  logout() {
    this.user = {};
    localStorage.clear();
    this.router.navigate(['']);
  }

}
