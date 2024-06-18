import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ConnectedUserRepository } from '../gateway/connected-user-repository';
import { ConnectedUserEntity } from '../gateway/schemas/connected-user.entity';
import { RoleModule } from '../role/role.module';
import { RoleEntity } from '../role/schemas/role.entity';
import { UserEntity } from './schemas/user.entity';
import { UserRepository } from './user-repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, UserRepository, ConnectedUserEntity, ConnectedUserRepository, RoleEntity]),
    RoleModule,
    forwardRef(() => AuthModule)
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
