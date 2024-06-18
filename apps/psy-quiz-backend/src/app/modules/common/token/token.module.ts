import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/schemas/user.entity';
import { UserToken } from './schemas/user-token.entity';
import { TokenService } from './token.service';

@Module({
  providers: [TokenService],
  imports: [TypeOrmModule.forFeature([UserToken, UserEntity])],
  exports: [TokenService]
})
export class TokenModule {}
