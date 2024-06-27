import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PermissionModule } from '../permission/permission.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RoleEntity} from "./schemas/role.entity";
import {PermissionEntity} from "../permission/schemas/permission.entity";
import {UserEntity} from "../user/schemas/user.entity";


@Module({
  providers: [ RoleService],
  controllers: [RoleController],
  imports: [
    TypeOrmModule.forFeature(([RoleEntity, PermissionEntity, UserEntity])),
    AuthModule,
    PermissionModule
  ],
  exports: [
    RoleService
  ]
})
export class RoleModule {}
