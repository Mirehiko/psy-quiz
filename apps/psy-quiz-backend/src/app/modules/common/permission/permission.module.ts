import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserEntity } from '../user/schemas/user.entity';
import { UserRepository } from '../user/user-repository';
import { PermissionRepository } from './permission-repository';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { PermissionEntity } from './schemas/permission.entity';

@Module({
  providers: [PermissionService],
  controllers: [PermissionController],
  imports: [
    TypeOrmModule.forFeature([PermissionEntity, PermissionRepository, UserEntity, UserRepository]),
    forwardRef(() => AuthModule)
    // TypeOrmModule.forFeature(([Permission, Role]))
  ],
  exports: [PermissionService]
})
export class PermissionModule {}
