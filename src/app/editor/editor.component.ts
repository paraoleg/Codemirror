import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { WebsocketService } from '../websocket.service';
declare var ot: any;

import "codemirror/lib/codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";

import * as CodeMirror from "codemirror"

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
    
    @Input() content: string;
    @ViewChild('editor') editor;
    
    cmClient: any;

    config = {
        lineNumbers: true,
        theme: 'monokai'
    };
    
    constructor( private socketService: WebsocketService ){
        this.content = ' ';
        this.socketService.editorChange()
            .subscribe(obj => {
                this.init(obj['str'], obj['revision'], obj['clients'], new ot.SocketIOAdapter(this.socketService.socket));
            });
    }
       
    init (str, revision, clients, serverAdapter) {
        if (!this.content) {
            this.content = str;
        } 
        this.cmClient = new ot.EditorClient(revision, clients, serverAdapter, new ot.CodeMirrorAdapter(this.editor.instance));
    }
        
    ngOnInit(): void {
       
    }
    
        
}
