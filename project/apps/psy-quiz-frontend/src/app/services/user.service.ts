import { Injectable, inject } from '@angular/core';
import { UserResponseDto } from '@common/dto';
import { UserRestService } from '../rest';
import { BaseService } from './base.service';

@Injectable()
export class UserService extends BaseService<UserResponseDto> {
  protected api = inject(UserRestService);
}
