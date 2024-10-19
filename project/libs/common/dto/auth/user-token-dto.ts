import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateUserTokenDto {
  @IsString()
  token: string;

  @IsNumber()
  userId: number;

  @IsDateString()
  expireAt: string;
}
