import { Injectable, inject } from '@angular/core';
import { TestRunResponseDto } from '@shared/dto';
import { IResponse } from '@shared/interfaces';
import { Observable } from 'rxjs';
import { RunRestService } from '../rest';
import { RunStore } from '../store';
import { BaseService } from './base.service';

@Injectable()
export class RunService extends BaseService<TestRunResponseDto> {
  protected api = inject(RunRestService);
  protected store = inject(RunStore);

  public start(id: string): Observable<IResponse<Boolean>> {
    return this.api.start(id);
  }

  public finish(id: string): Observable<IResponse<Boolean>> {
    return this.api.finish(id);
  }
}
