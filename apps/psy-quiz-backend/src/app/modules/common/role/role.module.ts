import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PermissionRepository } from '../permission/permission-repository';
import { PermissionModule } from '../permission/permission.module';
import { PermissionEntity } from '../permission/schemas/permission.entity';
import { UserRepository } from '../user/user-repository';
import { RoleRepository } from './role-repository';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleEntity } from './schemas/role.entity';

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  imports: [
    TypeOrmModule.forFeature([RoleRepository, RoleEntity, PermissionRepository, PermissionEntity, UserRepository]),
    AuthModule,
    PermissionModule
  ],
  exports: [RoleService]
})
export class RoleModule {}
