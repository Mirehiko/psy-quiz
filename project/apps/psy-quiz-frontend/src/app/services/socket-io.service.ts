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
    if (this.socket?.connected) {
      return;
    }
    this.socket = io('ws://localhost:5002/connection', {
      // transports: ['websocket'],
      extraHeaders: {
        authorization: 'Bearer ' + localStorage.getItem('jwt-token')
      },
      autoConnect: true
    });
  }

  public disconnect(): void {
    this.socket?.disconnect();
  }

  public setUpOnlineStatus(userId: string): void {
    this.socket?.emit('onlineStatus', { userId });
  }

  public getOnlineStatus(): Observable<any> {
    return new Observable((observer) => {
      this.socket?.on('onlineStatus', (status) => {
        observer.next(status);
      });
    });
  }
}
