import {forwardRef, Module} from '@nestjs/common';
import { UserRepository } from './user-repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RoleEntity} from "../role/schemas/role.entity";
import { RoleModule } from '../role/role.module';
import {AuthModule} from "../auth/auth.module";
import { ConnectedUserRepository } from '../gateway/connected-user-repository';
import {UserEntity} from "./schemas/user.entity";
import {ConnectedUserEntity} from "../gateway/schemas/connected-user.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature(([UserEntity, UserRepository, ConnectedUserEntity, ConnectedUserRepository, RoleEntity])),
        RoleModule,
        forwardRef(() => AuthModule)
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule {}
