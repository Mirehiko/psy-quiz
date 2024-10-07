import { Injectable, inject } from '@angular/core';
import { RunRestService } from '../rest';
import { BaseService } from './base.service';

@Injectable()
export class RunService extends BaseService {
  protected api = inject(RunRestService);
}
