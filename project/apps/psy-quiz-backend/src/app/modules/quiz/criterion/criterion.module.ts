import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScaleEntity } from '../scale/schemas/scale.entity';
import { CriterionController } from './criterion.controller';
import { CriterionService } from './criterion.service';
import { CriterionEntity } from './schemas/criterion.entity';
import { AuthModule } from '../../common/auth/auth.module';
import { PermissionEntity } from '../../common/permission/schemas/permission.entity';
import { UserEntity } from '../../common/user/schemas/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CriterionEntity, ScaleEntity, PermissionEntity, UserEntity]), forwardRef(() => AuthModule)],
  providers: [CriterionService],
  controllers: [CriterionController],
  exports: [CriterionService]
})
export class CriterionModule {}
