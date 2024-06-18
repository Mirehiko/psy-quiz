import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "../auth/auth.module";
import { ConnectedUserRepository } from './connected-user-repository';
import { ConnectedUserService } from './connected-user.service';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from '../user/user-repository';
import { UserModule } from '../user/user.module';
import {ConnectedUserEntity} from "./schemas/connected-user.entity";
import {UserEntity} from "../user/schemas/user.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature(([ConnectedUserRepository, ConnectedUserEntity, UserRepository, UserEntity])),
    AuthModule, UserModule, JwtModule,
  ],
  providers: [ConnectedUserService],
  exports: [ConnectedUserService]
})
export class GatewayModule {}
