import { Injectable, inject } from '@angular/core';
import { TestRestService } from '../rest';
import { BaseService } from './base.service';

@Injectable()
export class TestService extends BaseService {
  protected api = inject(TestRestService);
}
