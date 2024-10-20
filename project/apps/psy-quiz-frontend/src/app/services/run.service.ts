import { Injectable, inject } from '@angular/core';
import { RunAnswerRequestDto, RunAnswerResponseDto, TestRunResponseDto } from '@shared/dto';
import { IResponse } from '@shared/interfaces';
import { Observable, tap } from 'rxjs';
import { RunRestService } from '../rest';
import { RunStore } from '../store';
import { BaseService } from './base.service';

@Injectable()
export class RunService extends BaseService<TestRunResponseDto> {
  protected api = inject(RunRestService);
  protected store = inject(RunStore);

  public sendAnswer(runId: string, requestDto: RunAnswerRequestDto): Observable<IResponse<RunAnswerResponseDto>> {
    return this.api.sendAnswer(runId, requestDto).pipe(
      tap((resp) => {
        let answers = this.store.getBy('id', runId)?.answers;
        if (answers?.find((a) => a.id === resp.data.id)) {
          answers = answers?.map((a) => (a.id === resp.data.id ? resp.data : a));
        } else {
          answers?.push(resp.data);
        }
        this.store.update(runId, { answers });
      })
    );
  }

  public start(id: string): Observable<IResponse<Boolean>> {
    return this.api.start(id);
  }

  public finish(id: string): Observable<IResponse<Boolean>> {
    return this.api.finish(id);
  }
}
