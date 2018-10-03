import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { AceEditorModule } from 'ng2-ace-editor';
import { CodemirrorModule } from 'ng2-codemirror';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { TasksComponent } from './tasks/tasks.component';
import { RestApiService } from './rest-api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './task/task.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DataService } from './data.service';
import { MessageComponent } from './message/message.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { EditorComponent } from './editor/editor.component';
import { WebsocketService } from './websocket.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TasksComponent,
    TaskComponent,
    RegisterComponent,
    LoginComponent,
    MessageComponent,
    NewTaskComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AceEditorModule,
    CodemirrorModule
  ],
  providers: [
    RestApiService,
    DataService,
    HttpClient,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
