import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateUserTokenDto {
  @IsString()
  token: string;

  @IsNumber()
  userId: string;

  @IsDateString()
  expireAt: string;
}
