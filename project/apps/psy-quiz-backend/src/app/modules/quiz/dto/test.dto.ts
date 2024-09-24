import { ITest } from '../interfaces/i-test';
import { IQuestion } from '../interfaces/i-question';
import { IScale } from '../interfaces/i-scale';
import { ITestRun } from '../interfaces/i-test-run';
import { IsOptional, IsString } from 'class-validator';
import { IUser } from '../../common/user/schemas/user.entity';

export class TestRequestDto implements ITest {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  questions?: IQuestion[];

  @IsOptional()
  scales?: IScale[];

  @IsOptional()
  runs?: ITestRun[];
}

export class TestResponseDto implements ITest {
  id: string;
  name: string;
  description?: string;
  questions?: IQuestion[];
  scales?: IScale[];
  runs?: ITestRun[];
  createdBy: IUser;
}
