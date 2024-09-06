import { IsOptional, IsString } from 'class-validator';
import { IUser, UserEntity } from '../../common/user/schemas/user.entity';
import { ScaleAnswerEntity } from '../scale_answer/schemas/scale-answer.entity';
import { CriterionEntity } from '../criterion/schemas/criterion.entity';
import { TestEntity } from '../test/schemas/test.entity';

export interface IScale {
  name: string;
  description?: string;
  // createdBy?: IUser;
  answers?: ScaleAnswerEntity[];
  criteria?: CriterionEntity[];
  test?: TestEntity;
  createdBy?: UserEntity;
}

export class ScaleRequestDto implements IScale {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
export class ScaleResponseDto implements IScale {
  name: string;
  description?: string;
  // createdBy: IUser;
}
