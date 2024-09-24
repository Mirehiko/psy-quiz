import { Injectable, inject } from '@angular/core';
import { UserRestService } from '../rest';
import { BaseService } from './base.service';

@Injectable()
export class UserService extends BaseService {
  protected api = inject(UserRestService);
}
