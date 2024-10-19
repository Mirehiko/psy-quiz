import { Injectable, inject } from '@angular/core';
import { QuestionAnswerResponseDto, QuestionResponseDto } from '@shared/dto';
import { IResponse } from '@shared/interfaces';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { QuestionRestService } from '../rest';
import { QuestionStore } from '../store';
import { BaseService } from './base.service';

@Injectable()
export class QuestionService extends BaseService<QuestionResponseDto> {
  public answers$ = new BehaviorSubject<QuestionAnswerResponseDto[]>([]);
  protected api = inject(QuestionRestService);
  protected store = inject(QuestionStore);

  public addAnswer(questionId: string, requestDto: any): Observable<IResponse<QuestionAnswerResponseDto>> {
    return this.api.addAnswer(questionId, requestDto).pipe(
      tap((resp) => {
        this.answers$.next([...this.answers$.value, resp.data]);
      })
    );
  }

  public removeAnswer(questionId: string, answerId: string): Observable<any> {
    return this.api.removeAnswer(questionId, answerId).pipe(
      tap((resp) => {
        this.answers$.next(this.answers$.value.filter((a) => a.id !== answerId));
      })
    );
  }
}
