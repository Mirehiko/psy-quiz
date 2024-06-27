import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AuthModule } from '../auth/auth.module';
import {PermissionController} from "./permission.controller";
import {PermissionService} from "./permission.service";
import {PermissionEntity} from "./schemas/permission.entity";
import {UserEntity} from "../user/schemas/user.entity";


@Module({
  providers: [PermissionService],
  controllers: [PermissionController],
  imports: [
    TypeOrmModule.forFeature(([PermissionEntity, UserEntity])),
    AuthModule
  ],
  exports: [
    PermissionService
  ]
})
export class PermissionModule {}
