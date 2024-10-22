import { Exclude, Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { IScale } from '../interfaces';

export class ScaleRequestDto implements IScale {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  testId?: string;
}

@Exclude()
export class ScaleResponseDto implements IScale {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description?: string;
}
