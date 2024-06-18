import {UserEntity} from "./schemas/user.entity";
import { UserResponseDto } from '../../../shared';


export class UserHelper {
  public static mapEntitiesToDto(data: UserEntity[]): UserResponseDto[] {
    if (Array.isArray(data)) {
      const result: UserResponseDto[] = [];
      data.forEach(d => {
        result.push(Object.assign(new UserResponseDto(), d));
      });
      return result;
    }
    throw new Error('Data must be array');
  }

  public static mapEntityToDto(data: UserEntity): UserResponseDto {
    return Object.assign(new UserResponseDto(), data);
  }
}
