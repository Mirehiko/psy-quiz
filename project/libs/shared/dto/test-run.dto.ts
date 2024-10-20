import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { IUser } from '../../common';
import { ITestRun, ITestRunRequestDto, ITestRunResponseDto } from '../interfaces';
import { RunAnswerResponseDto } from './run-answer.dto';

export class TestRunRequestDto implements ITestRunRequestDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsString()
  testId: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  userId?: string;
}

@Exclude()
export class TestRunResponseDto implements ITestRunResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  isFinished: boolean;

  @Expose()
  answers?: RunAnswerResponseDto[];

  user: IUser;
  test: ITestRun;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  userId: string;

  testId: string;

  @Expose()
  createdAt: Date;
}
