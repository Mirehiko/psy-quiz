import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Query, UploadedFile, UseGuards, UseInterceptors, UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from '../auth/roles-auth.decorator';
import { FileInterceptor } from "@nestjs/platform-express";
// import { TransformInterceptor } from '../../../interceptors/transform.interceptor';
import { plainToClass } from 'class-transformer';
import { BanUserDto, IUserGetParamsData, UserRequestDto, UserResponseDto, UserRolesDto } from '../../../shared';


@ApiTags('Пользователи')
@Controller('main')
// @UseInterceptors(new TransformInterceptor())
export class UserController {
  constructor(private readonly service: UserService) {
  }

  @ApiOperation({summary: 'Получение списка пользователей'})
  // @ApiResponse({status: 200, type: [UserResponseDto]})
  @Roles("ADMIN")
  // @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('users')
  async getUsers(): Promise<UserResponseDto[]> {
    const users = await this.service.getAll(['roles', 'roles.permissions']);
    return plainToClass(UserResponseDto, users, { enableCircularCheck: true });
  }

  @ApiOperation({summary: 'Получение пользователя'})
  @ApiResponse({status: 200, type: UserResponseDto})
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    const user = await this.service.getByID(id, ['roles', 'roles.permissions']);
    return plainToClass(UserResponseDto, user, { enableCircularCheck: true });
    // return plainToClass(UserResponseDto, user, { enableCircularCheck: true, excludeExtraneousValues: true });
  }

  @ApiOperation({summary: 'Получение пользователя полю'})
  @ApiResponse({status: 200, type: UserResponseDto})
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('user/')
  async getUserBy(@Body() userRequestParams: IUserGetParamsData): Promise<UserResponseDto> {
    const user = await this.service.getBy(userRequestParams, ['roles', 'roles.permissions']);
    return plainToClass(UserResponseDto, user, { enableCircularCheck: true });
  }

  @ApiOperation({summary: 'Обновление пользователя'})
  @ApiResponse({status: 200, type: UserResponseDto})
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(FileInterceptor('avatar'))
  @Patch('user/:id')
  async updateUser(
    @Body() requestDto: UserRequestDto,
    @Param() id: string,
    @UploadedFile() avatar
  ): Promise<UserResponseDto> {
    const user = await this.service.updateUser(id, requestDto, avatar);
    return plainToClass(UserResponseDto, user, { enableCircularCheck: true });
  }

  @ApiOperation({summary: 'Создание пользователя'})
  @ApiResponse({status: 201, type: UserResponseDto})
  // @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post('user')
  // @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() requestDto: UserRequestDto): Promise<UserResponseDto> {
    const user = await this.service.createUser(requestDto);
    return plainToClass(UserResponseDto, user, { enableCircularCheck: true });
  }

  @ApiOperation({summary: 'Удаление пользователя'})
  @ApiResponse({status: 200})
  @UseGuards(JwtAuthGuard)
  @Delete('user/:id')
  async deleteUser(@Param('id') id: string): Promise<any> {
    return await this.service.delete([id]);
  }

  @ApiOperation({summary: 'Назначение прав пользователю'})
  @ApiResponse({status: 201})
  @UseGuards(JwtAuthGuard)
  @Post('user/assignRoles')
  async assignRolesToUser(@Body() userRolesDto: UserRolesDto): Promise<any> {
    return await this.service.assignRolesToUser(userRolesDto);
  }

  @ApiOperation({summary: 'Удаление прав пользователя'})
  @ApiResponse({status: 201})
  @UseGuards(JwtAuthGuard)
  @Post('user/removeUserRoles')
  async removeUserRoles(@Body() userRolesDto: UserRolesDto): Promise<any> {
    return await this.service.removeUserRoles(userRolesDto);
  }

  @ApiOperation({summary: 'Блокировка пользователя'})
  @ApiResponse({status: 201})
  @UseGuards(JwtAuthGuard)
  @Post('user/suspend')
  async suspend(@Body() banUserDto: BanUserDto): Promise<any> {
    return await this.service.suspend(banUserDto);
  }

  @ApiOperation({summary: 'Разблокировка пользователя'})
  @ApiResponse({status: 201})
  @UseGuards(JwtAuthGuard)
  @Post('user/unsuspend')
  async unsuspend(@Body() banUserDto: BanUserDto): Promise<any> {
    return await this.service.unsuspend(banUserDto);
  }
}
