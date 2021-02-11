import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  // Private socket member to hold onto the Socket connection
  private socket: any

  // Create our socket connector
  constructor() {
    this.socket = io(window.location.host)
  }

  // onEvent
  // params: Event Name (string)
  // Returns an observable for an event
  onEvent(event: string) {
    return new Observable(observer => {
      this.socket.on(event, data => {
        observer.next(data)
      })
    })
  }
}
