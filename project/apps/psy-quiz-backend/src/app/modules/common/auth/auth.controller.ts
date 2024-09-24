import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Res,
  UseInterceptors
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import {
  AuthResponseDto,
  AuthUserDto,
  ChangePasswordDto,
  ForgotPasswordDto,
  UserRequestDto,
  UserResponseDto
} from '../../../shared';
import { UserEntity } from '../user/schemas/user.entity';
import { AuthService } from './auth.service';
import { TransformInterceptor } from '../../../interceptors/transform.interceptor';

// TODO: Use class-transformer
@ApiTags('Авторизация')
@Controller('auth')
@UseInterceptors(new TransformInterceptor())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201, type: UserEntity })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('registration')
  // регистрация пользователя
  async register(@Body() userRequestDto: UserRequestDto): Promise<any> {
    return this.authService.signUp(userRequestDto);
  }

  @ApiOperation({ summary: 'Вход в систему' })
  @ApiResponse({ status: 200, type: UserEntity })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  // вход в систему
  async login(@Body() requestDto: AuthUserDto): Promise<AuthResponseDto> {
    console.log(requestDto)
    const authUser = await this.authService.signIn(requestDto);
    return plainToInstance(AuthResponseDto, authUser, { enableCircularCheck: true });
  }

  @ApiOperation({ summary: 'Выход из системы' })
  @ApiResponse({ status: 200, type: UserEntity })
  @Post('logout')
  // выход из системы
  async logout(@Body() query: { token: string }): Promise<any> {
    return this.authService.logout(query.token);
  }

  @Get('/confirm')
  // подтверждение регистрации
  async confirm(@Query() query: { token: string }): Promise<boolean> {
    await this.authService.confirm(query.token);
    return true;
  }

  @ApiOperation({ summary: 'Восстановление пароля' })
  @Post('/forgotPassword')
  // восстановить пароль
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @ApiOperation({ summary: 'Получение пользователя по токену' })
  @Post('/by-token')
  async getUserByToken(@Body() body): Promise<UserResponseDto> {
    const user = this.authService.getUserByToken(body.token);
    return plainToInstance(UserResponseDto, user, { enableCircularCheck: true });
  }

  @Patch('/change-password')
  // @UseGuards(AuthGuard())
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto
    // @Body(new ValidationPipe()) changePasswordDto: ChangePasswordDto,
  ): Promise<boolean> {
    return this.authService.changePassword(changePasswordDto);
  }
}
