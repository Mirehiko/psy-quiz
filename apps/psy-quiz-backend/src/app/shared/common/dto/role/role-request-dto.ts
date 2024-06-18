import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { RequestObjectWithId } from '../objectWithId';
import { PermissionRequestDto } from '../permission';

export class RoleRequestDto implements RequestObjectWithId {
  @IsOptional()
  @IsNumber()
  id?: string;

  @IsString()
  name: string;

  @IsString()
  displayName: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  permissions: PermissionRequestDto[];
}
