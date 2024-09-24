import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CriterionEntity } from '../criterion/schemas/criterion.entity';
import { ScaleAnswerEntity } from '../scale_answer/schemas/scale-answer.entity';
import { TestEntity } from '../test/schemas/test.entity';
import { ScaleController } from './scale.controller';
import { ScaleService } from './scale.service';
import { ScaleEntity } from './schemas/scale.entity';
import { PermissionEntity } from '../../common/permission/schemas/permission.entity';
import { UserEntity } from '../../common/user/schemas/user.entity';
import { AuthModule } from '../../common/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ScaleEntity, TestEntity, CriterionEntity, ScaleAnswerEntity, PermissionEntity, UserEntity]), forwardRef(() => AuthModule)],
  providers: [ScaleService],
  controllers: [ScaleController],
  exports: [ScaleService]
})
export class ScaleModule {}
