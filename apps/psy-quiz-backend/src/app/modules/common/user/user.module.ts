import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RoleModule } from '../role/role.module';
import {AuthModule} from "../auth/auth.module";
import {RoleEntity} from "../role/schemas/role.entity";
import {ConnectedUserEntity} from "../gateway/schemas/connected-user.entity";
import {UserEntity} from "./schemas/user.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature(([UserEntity, ConnectedUserEntity, RoleEntity])),
    RoleModule,
    forwardRef(() => AuthModule)
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
