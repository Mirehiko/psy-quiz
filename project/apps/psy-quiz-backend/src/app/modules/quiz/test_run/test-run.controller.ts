import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  OnModuleInit,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { RunAnswerRequestDto, RunAnswerResponseDto, TestRunRequestDto, TestRunResponseDto } from '@shared/dto';
import { plainToInstance } from 'class-transformer';
import { Server, Socket } from 'socket.io';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard';
import { TestRunService } from './test-run.service';

@ApiTags('Прохождение теста')
@Controller('main')
@UseInterceptors(new TransformInterceptor())
@WebSocketGateway({
  namespace: 'run',
  cors: { origin: ['http://localhost:5002', 'http://localhost:3000', 'http://localhost:4200'] }
})
export class TestRunController implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  @WebSocketServer()
  private server: Server;
  private logger: Logger = new Logger('AppGateway');
  private usersRunningTest = new Map<string, { userId: string; userConnection: string }>();

  constructor(private readonly service: TestRunService) {}

  // @UseGuards(JwtAuthGuard)
  @Get('test-run/list')
  async getAll(): Promise<TestRunResponseDto[]> {
    const entities = await this.service.getAll(['answers']);
    return plainToInstance(TestRunResponseDto, entities, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('test-run')
  async create(@Body() requestDto: TestRunRequestDto, @Req() request): Promise<TestRunResponseDto> {
    const entity = await this.service.create(requestDto, request.user);
    return plainToInstance(TestRunResponseDto, entity, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Get('test-run/:id')
  async getById(@Param('id') id: string): Promise<TestRunResponseDto> {
    const entity = await this.service.getByID(id, ['answers']);
    return plainToInstance(TestRunResponseDto, entity, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('test-run/:id')
  async update(@Body() requestDto: TestRunRequestDto, @Param() id: string): Promise<TestRunResponseDto> {
    const entity = await this.service.getByID(id, ['answers']);
    return plainToInstance(TestRunResponseDto, entity, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('test-run/:id/start')
  async startRun(@Param('id') id: string, @Req() request): Promise<TestRunResponseDto> {
    const entity = await this.service.startRun(id, request.user);
    return plainToInstance(TestRunResponseDto, entity, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('test-run/:id/finish')
  async finishRun(@Param('id') id: string, @Req() request): Promise<TestRunResponseDto> {
    const entity = await this.service.finishRun(id, request.user);
    return plainToInstance(TestRunResponseDto, entity, { enableCircularCheck: true });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('test-run/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('test-run/:id/answer')
  async addAnswer(
    @Param('id') id: string,
    @Body() requestDto: RunAnswerRequestDto,
    @Req() request
  ): Promise<RunAnswerResponseDto> {
    const entity = await this.service.addAnswer(id, requestDto, request.user);
    console.warn(entity);
    return plainToInstance(RunAnswerResponseDto, entity, { enableCircularCheck: true });
  }

  afterInit(server: Server) {
    this.logger.log('Socket-server up');
  }

  async handleDisconnect(client: Socket) {
    // await this.connectedUserService.deleteBySocketId(client.id);
    // client.disconnect();
    // this.logger.log(`Client disconnected: ${client.id}`);
  }

  async handleConnection(client: Socket, ...args: any[]) {
    // try {
    //   const tokenUser = await this.jwtService.verify(client.handshake.headers.authorization);
    //   const user = await this.userService.getByID(tokenUser.id, ['roles']);
    //   if (!user) {
    //     return this.disconnect(client);
    //   }
    //   this.logger.log(`Client connected: ${client.id}`);
    //   client.data.user = user;
    //   await this.connectedUserService.create(client.id, user);
    //   // return this.server.to(client.id).emit('notifications', notifications);
    // } catch (err) {
    //   console.log(err);
    //   return this.disconnect(client);
    // }
  }

  private disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
    this.logger.log(`Client disconnected: ${socket.id}`);
  }

  async onModuleInit() {
    // await this.connectedUserService.deleteAll();
  }

  private async sendNotification<T>(socketId: string, eventType: string, data: T): Promise<void> {
    // TODO: Is it need to change 'Task' to 'TaskResponseDto'?
    await this.server.to(socketId).emit(eventType, data);
    // TODO: save changes to database
  }
}
