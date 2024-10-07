import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PermissionModule } from '../permission/permission.module';
import { PermissionEntity } from '../permission/schemas/permission.entity';
import { UserEntity } from '../user/schemas/user.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { RoleEntity } from './schemas/role.entity';

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  imports: [
    TypeOrmModule.forFeature([RoleEntity, PermissionEntity, UserEntity]),
    forwardRef(() => AuthModule),
    PermissionModule
  ],
  exports: [RoleService]
})
export class RoleModule {}
