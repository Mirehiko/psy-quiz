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
  private connectedUsers = new Map<string, string>();

  constructor(
    private userService: UserService,
    private connectedUserService: ConnectedUserService,
    private jwtService: JwtService
  ) {}

  @SubscribeMessage('onlineStatus')
  async onStatusChange(@ConnectedSocket() client: Socket): Promise<WsResponse> {
    const authHeader = client.handshake.headers.authorization;
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException({ message: 'User unauthorized' });
    }
    const tokenUser = await this.jwtService.verify(token);
    const user = await this.userService.getByID(tokenUser.id, ['roles']);
    if (!user) {
      return { event: 'onlineStatus', data: { connectionId: client.id, status: 'Offline' } };
    }
    if (user.roles.find((role) => +role.id === 1)) {
      const connectedUsers = await this.connectedUserService.getAllConnectedUsers();
      return {
        event: 'onlineStatus',
        data: {
          connectionId: client.id,
          status: 'Online',
          userId: user.id,
          users: connectedUsers.map((u) => ({
            userId: u.user.id,
            connectionId: u.socketId,
            status: 'Online'
          }))
        }
      };
    }
    return { event: 'onlineStatus', data: { connectionId: client.id, userId: user.id, status: 'Online' } };
  }

  afterInit(server: Server) {
    this.logger.log('Socket-server up');
  }

  async handleDisconnect(client: Socket): Promise<void> {
    await this.connectedUserService.deleteBySocketId(client.id);
    client.disconnect();
    this.logger.log(`Client disconnected: ${client.id}`);
    this.server.emit('onlineStatus', {
      connectionId: client.id,
      userId: this.connectedUsers.get(client.id),
      status: 'Offline'
    });
    this.connectedUsers.delete(client.id);
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<any> {
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
        return this.disconnect(client, undefined);
      }
      this.logger.log(`Client connected: ${client.id}`);
      client.data.user = user;
      await this.connectedUserService.create(client.id, user);
      this.connectedUsers.set(client.id, user.id);
      this.server.emit('onlineStatus', { connectionId: client.id, userId: user.id, status: 'Online' });
      // return this.server.to(client.id).emit('notifications', notifications);
    } catch (err) {
      console.log(err);
      return await this.disconnect(client);
    }
  }

  private async disconnect(client: Socket, userId?: string): Promise<void> {
    client.emit('Error', new UnauthorizedException());
    client.disconnect();
    await this.connectedUserService.deleteBySocketId(client.id);
    this.server.emit('onlineStatus', { connectionId: undefined, userId: client.id, status: 'Offline' });
    this.connectedUsers.delete(client.id);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async onModuleInit(): Promise<void> {
    await this.connectedUserService.deleteAll();
  }

  private async sendNotification<T>(socketId: string, eventType: string, data: T): Promise<void> {
    // TODO: Is it need to change 'Task' to 'TaskResponseDto'?
    await this.server.to(socketId).emit(eventType, data);
    // TODO: save changes to database
  }
}
