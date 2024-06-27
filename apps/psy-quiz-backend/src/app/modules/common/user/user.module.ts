import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ConnectedUserEntity } from '../gateway/schemas/connected-user.entity';
import { RoleModule } from '../role/role.module';
import { RoleEntity } from '../role/schemas/role.entity';
import { UserEntity } from './schemas/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ConnectedUserEntity, RoleEntity]),
    RoleModule,
    forwardRef(() => AuthModule)
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
