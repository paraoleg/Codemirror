import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './task/task.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NewTaskComponent } from './new-task/new-task.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent
  },
  { 
    path: 'register', 
    component: RegisterComponent
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
  { 
    path: 'newTask', 
    component: NewTaskComponent
  },
  { 
    path: 'tasks', 
    component: TasksComponent
  },
  { 
    path: 'task/:id', 
    component: TaskComponent
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
