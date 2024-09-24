import { Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from '@nestjs/websockets';
import { Observable, of } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { UserService } from '../user/user.service';
import { ConnectedUserService } from './connected-user.service';

@WebSocketGateway({
  namespace: 'connection',
  // transports: ['websocket'],
  cors: { origin: ['http://localhost:5002', 'http://localhost:3000', 'http://localhost:4200'] }
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  constructor(
    private userService: UserService,
    private connectedUserService: ConnectedUserService,
    private jwtService: JwtService
  ) {}

  @SubscribeMessage('onlineStatus')
  onStatusChange(@MessageBody() data, @ConnectedSocket() client: Socket): Observable<WsResponse> {
    return of({ event: 'onlineStatus', data: client.id });
  }

  afterInit(server: Server) {
    this.logger.log('Socket-server up');
  }

  async handleDisconnect(client: Socket) {
    await this.connectedUserService.deleteBySocketId(client.id);
    client.disconnect();
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    try {
      const authHeader = client.handshake.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User unauthorized' });
      }
      const tokenUser = await this.jwtService.verify(token);
      const user = await this.userService.getByID(tokenUser.id, ['roles']);
      if (!user) {
        return this.disconnect(client);
      }
      this.logger.log(`Client connected: ${client.id}`);
      client.data.user = user;
      await this.connectedUserService.create(client.id, user);
      // return this.server.to(client.id).emit('notifications', notifications);
    } catch (err) {
      console.log(err);
      return this.disconnect(client);
    }
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
    this.logger.log(`Client disconnected: ${socket.id}`);
  }

  async onModuleInit() {
    await this.connectedUserService.deleteAll();
  }

  private async sendNotification<T>(socketId: string, eventType: string, data: T): Promise<void> {
    // TODO: Is it need to change 'Task' to 'TaskResponseDto'?
    await this.server.to(socketId).emit(eventType, data);
    // TODO: save changes to database
  }
}
