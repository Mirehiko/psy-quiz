import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { UserService } from '../user/user.service';
import { ConnectedUserService } from './connected-user.service';
import { JwtService } from '@nestjs/jwt';


@WebSocketGateway({ cors: { origin: ['http://localhost:5002', 'http://localhost:3000', 'http://localhost:4200'] } })
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  constructor(
    private userService: UserService,
    private connectedUserService: ConnectedUserService,
    private jwtService: JwtService,
  ) {
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
      const tokenUser = await this.jwtService.verify(client.handshake.headers.authorization);
      const user = await this.userService.getByID(tokenUser.id, ['roles']);
      if (!user) {
        return this.disconnect(client);
      }
      this.logger.log(`Client connected: ${client.id}`);
      client.data.user = user;
      await this.connectedUserService.create(client.id, user);
      // return this.server.to(client.id).emit('notifications', notifications);
    }
    catch(err) {
      console.log(err)
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
