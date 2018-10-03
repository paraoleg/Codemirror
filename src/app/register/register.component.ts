import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../rest-api.service';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name = '';
  email = '';
  password = '';
  password2 = '';
  btnDisabled = false;

  constructor(
    private rest: RestApiService,
    private router: Router,
    private data: DataService
  ) { }

  ngOnInit() {
  }

  validate() {
    if (this.name) {
      if (this.email) {
        if (this.password) {
          if (this.password2) {
            if (this.password === this.password2) {
              return true;
            } else {
              this.data.error('Passwords do not match.');
            }
          } else {
            this.data.error('Confirmation Password is not entered');
          }
        } else {
          this.data.error('Password is not entered');
        }
      } else {
        this.data.error('Email is not entered.');
      }
    } else {
      this.data.error('Name is not entered.');
    }
  }

  async register() {
    this.btnDisabled = true;
    try {
      if(this.validate()){
        const data = await this.rest.post('http://localhost:3030/api/auth/signup', {
          name: this.name, 
          email: this.email,
          password: this.password,
        })
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          this.data.success('Registration successful!');
          await this.data.getProfile();
          this.router.navigate(['/'])
            .then(() => this.data.success('Registration Successful! Please enter your shipping address below'))
            .catch(error => this.data.error(error));
        } else {
          this.data.error(data['message']);
        }
      }
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }


}
