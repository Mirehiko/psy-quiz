import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  MethodNotAllowedException,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';
import moment from 'moment';
import { AuthResponseDto, AuthUserDto, ChangePasswordDto, ForgotPasswordDto, UserRequestDto } from '../../../shared';
import { CreateUserTokenDto } from '../token/dto';
import { TokenService } from '../token/token.service';
import { UserEntity } from '../user/schemas/user.entity';
import { UserStatusEnum } from '../user/user-status.enum';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  private readonly clientAppUrl: string;

  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {
    // this.clientAppUrl = this.configService.get<string>('FE_APP_URL');
  }

  /**
   * Register new user
   * @param userRequestDto
   */
  async signUp(userRequestDto: UserRequestDto): Promise<any> {
    const candidate = await this.userService.getBy({
      checkOnly: true,
      params: { email: userRequestDto.email }
    });
    if (candidate) {
      throw new HttpException('Такой email уже существует. Введите другой email', HttpStatus.CONFLICT);
    }
    userRequestDto.password += '';
    // TODO: hash password
    // const hashPassword = await bcrypt.hash(userRequestDto.password, 5);
    // const operation = await this.userService.createUser({...userRequestDto, password: hashPassword});
    // return await this.generateToken(operation);
    const user = await this.userService.createUser({ ...userRequestDto });
    await this.sendConfirmation(user);
    return true;
  }

  /**
   * User login
   * @param requestDto
   */
  async signIn(requestDto: AuthUserDto): Promise<AuthResponseDto | false> {
    const user = await this.validateUser(requestDto);
    const expiresIn = moment().add(7, 'days').valueOf();
    const token = await this.generateToken(user, { expiresIn });
    if (user.status === UserStatusEnum.PENDING) {
      // operation.status = UserStatusEnum.ACTIVE;
      // await this.userService.usersRepository.save(operation);
      await this.sendConfirmation(user);
      return false;
    }
    await this.tokenService.create({ token, userId: user.id!, expireAt: expiresIn.toString() });
    return { token, user };
  }

  /**
   * User logout
   * @param token
   */
  async logout(token: string): Promise<any> {
    const data = await this.verifyToken(token.split(' ')[1]);
    return await this.tokenService.deleteAll(data.id);
  }

  /**
   * Creates temp token to activate user
   * @param user
   * @param withStatusCheck
   */
  async signUser(user: UserEntity, withStatusCheck: boolean = true): Promise<string> {
    if (withStatusCheck && user.status === UserStatusEnum.BLOCKED) {
      throw new MethodNotAllowedException();
    }

    const expireAt = moment().add(1, 'days');
    const token = await this.generateToken(user, { expiresIn: moment().add(7, 'days').valueOf() });

    await this.saveToken({
      token,
      expireAt: expireAt.toISOString(),
      userId: user.id
    });

    return token;
  }

  /**
   *
   * @param changePasswordDto
   */
  async changePassword(changePasswordDto: ChangePasswordDto): Promise<boolean> {
    const data = await this.verifyToken(changePasswordDto.token);
    const password = await this.userService.hashPassword(changePasswordDto.password);

    await this.userService.updateUserPass(data.id, password);
    await this.tokenService.deleteAll(data.id);
    return true;
  }

  /**
   * Confirmation and activation user
   * @param token
   */
  async confirm(token: string): Promise<UserEntity> {
    const data = await this.verifyToken(token);
    const user = await this.userService.getByID(data.id);

    await this.tokenService.delete(data.id, token);

    if (user && user.status === UserStatusEnum.PENDING) {
      user.status = UserStatusEnum.ACTIVE;
      return await this.userService.updateUser(user.id, user);
    }
    throw new BadRequestException('Confirmation error');
  }

  /**
   * Sends confirmation to user
   * @param user
   */
  async sendConfirmation(user: UserEntity): Promise<void> {
    const token = await this.signUser(user, false);
    const confirmLink = `${this.clientAppUrl}/auth/confirm?token=${token}`;
    console.log(confirmLink);
    // await this.mailService.send({
    //     from: this.configService.get<string>('JS_CODE_MAIL'),
    //     to: operation.email,
    //     subject: 'Verify User',
    //     html: `
    //         <h3>Hello ${operation.firstName}!</h3>
    //         <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
    //     `,
    // });
  }

  /**
   *
   * @param user
   * @param options
   * @private
   */
  private async generateToken(user: UserEntity, options?: SignOptions): Promise<string> {
    const payload = { email: user.email, id: user.id }; //еще роли, но что-то нет...
    return this.jwtService.sign(payload, options);
  }

  /**
   *
   * @param authUserDto
   * @private
   */
  private async validateUser(authUserDto: AuthUserDto): Promise<UserEntity> {
    const candidate = await this.userService.getBy({
      checkOnly: true,
      params: { email: authUserDto.email }
    });
    // TODO: hash password
    // const isPasswordEquals = await bcrypt.compare(authUserDto.password + '', candidate.password);
    if (!candidate) {
      throw new UnauthorizedException({ message: 'Incorrect email or password' });
    }
    const isPasswordEquals = authUserDto.password + '' === candidate.password;
    if (candidate && isPasswordEquals) {
      return candidate;
    }
    throw new UnauthorizedException({ message: 'Incorrect email or password' });
  }

  /**
   *
   * @param token
   * @private
   */
  private async verifyToken(token: string): Promise<any> {
    const data = await this.jwtService.verify(token);
    const tokenExists = await this.tokenService.exists(token);

    if (tokenExists) {
      return data;
    }
    throw new UnauthorizedException();
  }

  /**
   *
   * @param createUserTokenDto
   * @private
   */
  private async saveToken(createUserTokenDto: CreateUserTokenDto) {
    return this.tokenService.create(createUserTokenDto);
  }

  /**
   *
   * @param forgotPasswordDto
   */
  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const user = await this.userService.getBy({
      params: { email: forgotPasswordDto.email }
    });
    if (!user) {
      throw new BadRequestException('Invalid email');
    }
    const token = await this.signUser(user);
    if (user.status === UserStatusEnum.PENDING) {
      await this.confirm(token);
    }
    const forgotLink = `${this.clientAppUrl}/auth/change-password?token=${token}`;
    console.log(forgotLink);
    // await this.mailService.send({
    //     from: this.configService.get<string>('JS_CODE_MAIL'),
    //     to: operation.email,
    //     subject: 'Forgot Password',
    //     html: `
    //         <h3>Hello ${operation.firstName}!</h3>
    //         <p>Please use this <a href="${forgotLink}">link</a> to reset your password.</p>
    //     `,
    // });
  }

  async getUserByToken(token: string): Promise<UserEntity> {
    const user = await this.jwtService.verify(token);
    return await this.userService.getByID(user.id);
  }
}
