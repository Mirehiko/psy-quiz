import { IsOptional, IsString } from 'class-validator';
import { IUser } from '../../common';
import { IQuestion, IScale, ITest, ITestRun } from '../interfaces';

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
