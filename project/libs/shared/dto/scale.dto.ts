import { IsOptional, IsString } from 'class-validator';
import { IScale } from '../interfaces';

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
