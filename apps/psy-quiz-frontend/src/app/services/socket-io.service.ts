import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';

enum OnlineStatus {
  Online = 'Online',
  Offline = 'Offline'
}

@Injectable()
export class SocketIoService {
  public socket: Socket | undefined;

  constructor() {}

  public connect(): void {
    console.warn(localStorage.getItem('jwt-token'));
    this.socket = io('ws://localhost:5002/connection', {
      // transports: ['websocket'],
      extraHeaders: {
        authorization: 'Bearer ' + localStorage.getItem('jwt-token')
      }
    });
  }

  public setUpOnlineStatus(userId: string): void {
    this.socket?.emit('onlineStatus', { userId });
  }

  public getOnlineStatuses(): Observable<any> {
    return new Observable((observer) => {
      this.socket?.on('onlineStatus', (status) => {
        console.warn(status, 'asd');
        observer.next(status);
      });
    });
  }
}
