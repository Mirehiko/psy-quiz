import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScaleEntity } from '../scale/schemas/scale.entity';
import { ScaleAnswerController } from './scale-answer.controller';
import { ScaleAnswerService } from './scale-answer.service';
import { ScaleAnswerEntity } from './schemas/scale-answer.entity';
import { PermissionEntity } from '../../common/permission/schemas/permission.entity';
import { UserEntity } from '../../common/user/schemas/user.entity';
import { AuthModule } from '../../common/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ScaleAnswerEntity, ScaleEntity, PermissionEntity, UserEntity]), forwardRef(() => AuthModule)],
  providers: [ScaleAnswerService],
  controllers: [ScaleAnswerController],
  exports: [ScaleAnswerService]
})
export class ScaleAnswerModule {}
