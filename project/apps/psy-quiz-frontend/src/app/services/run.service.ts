import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RunRestService } from '../rest';
import { BaseService } from './base.service';

@Injectable()
export class RunService extends BaseService {
  protected api = inject(RunRestService);

  public start(id: string): Observable<any> {
    return this.api.start(id);
  }

  public finish(id: string): Observable<any> {
    return this.api.finish(id);
  }
}
