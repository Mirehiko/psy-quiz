import { Injectable, inject } from '@angular/core';
import { IExtendedUserOnlineStatus } from '@shared/interfaces';
import { Observable } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { API_SOCKET_TOKEN } from '../api-token';

@Injectable()
export class SocketIoService {
  public socket: Socket | undefined;
  private socketToken = inject(API_SOCKET_TOKEN);

  constructor() {}

  public connect(): void {
    if (this.socket?.connected) {
      return;
    }
    this.socket = io(`${this.socketToken}/connection`, {
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

  public getOnlineStatus(): Observable<IExtendedUserOnlineStatus> {
    return new Observable((observer) => {
      this.socket?.on('onlineStatus', (status) => {
        observer.next(status);
      });
    });
  }
}
