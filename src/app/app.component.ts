import { Component ,OnInit } from '@angular/core';
import * as io from 'socket.io-client';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private url = 'http://localhost:5001';
  private socket;
  public msgdetails = [];
   public msgtext;
  constructor() { }

  ngOnInit() {
    
    
  }
  send(data)
  {
    this.msgtext="";
    console.log('content component',data)
    this.socket = io.connect(this.url);
     let sample=data;
     this.socket.emit('save-message', sample)
         
    this.socket.on('new-message', (sample) => {
      console.log('message: ',sample);
      
     this.msgdetails.push(sample);
   
    });
  }
}
