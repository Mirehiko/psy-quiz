import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenService } from '../token/token.service';
import { UserEntity } from '../user/schemas/user.entity';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'User unauthorized' });
      }
      const user = await this.jwtService.verify(token);
      const exists = await this.tokenService.exists(token);
      if (!exists) {
        throw new UnauthorizedException({ message: 'User unauthorized' });
      }
      req.user = await this.userRepository.findOne({
        where: { id: user.id },
        relations: ['roles', 'roles.permissions']
      });
      // TODO: Need to get operation and his params
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'User unauthorized' });
    }
  }
}
