import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-nav-container',
  templateUrl: './nav-container.component.html',
  styleUrls: ['./nav-container.component.css']
})
export class NavContainerComponent implements OnInit {

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    this.socketService.onEvent('ping').subscribe( observed => {
      console.log(observed)
    })
  }

}
