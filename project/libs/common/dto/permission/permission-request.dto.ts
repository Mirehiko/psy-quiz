import { IsOptional, IsString } from 'class-validator';
import { RequestObjectWithId } from '../objectWithId';

export class PermissionRequestDto implements RequestObjectWithId {
  @IsOptional()
  id?: string;

  @IsString()
  name: string;

  @IsString()
  displayName: string;

  @IsString()
  description: string;
}
