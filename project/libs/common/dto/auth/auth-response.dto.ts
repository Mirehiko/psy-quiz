import { IsNotEmpty } from 'class-validator';
import { UserResponseDto } from '../user';

export class AuthResponseDto {
  @IsNotEmpty()
  token: string;

  @IsNotEmpty()
  user: UserResponseDto;
}
