import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserEntity } from '../user/schemas/user.entity';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { PermissionEntity } from './schemas/permission.entity';

@Module({
  providers: [PermissionService],
  controllers: [PermissionController],
  imports: [TypeOrmModule.forFeature([PermissionEntity, UserEntity]), forwardRef(() => AuthModule)],
  exports: [PermissionService]
})
export class PermissionModule {}
