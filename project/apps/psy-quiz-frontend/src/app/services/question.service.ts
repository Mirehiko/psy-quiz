import { Injectable, inject } from '@angular/core';
import { QuestionAnswerRequestDto, QuestionAnswerResponseDto, QuestionResponseDto } from '@shared/dto';
import { IResponse } from '@shared/interfaces';
import { Observable, tap } from 'rxjs';
import { QuestionRestService } from '../rest';
import { QuestionStore } from '../store';
import { BaseService } from './base.service';

@Injectable()
export class QuestionService extends BaseService<QuestionResponseDto> {
  protected api = inject(QuestionRestService);
  protected store = inject(QuestionStore);

  public addAnswer(
    questionId: string,
    requestDto: QuestionAnswerRequestDto
  ): Observable<IResponse<QuestionAnswerResponseDto>> {
    return this.api.addAnswer(questionId, requestDto).pipe(
      tap((resp) => {
        this.store.update(questionId, { answers: [...(this.store.getBy('id', questionId)?.answers || []), resp.data] });
      })
    );
  }

  public updateAnswer(
    questionId: string,
    answerId: string,
    requestDto: QuestionAnswerRequestDto
  ): Observable<IResponse<QuestionAnswerResponseDto>> {
    return this.api.updateAnswer(questionId, answerId, requestDto).pipe(
      tap((resp) => {
        this.store.update(questionId, {
          answers: this.store.getBy('id', questionId)?.answers?.map((a) => {
            if (a.id === answerId) {
              return resp.data;
            }
            return a;
          })
        });
      })
    );
  }

  public removeAnswer(questionId: string, answerId: string): Observable<any> {
    return this.api.removeAnswer(questionId, answerId).pipe(
      tap((resp) => {
        this.store.update(questionId, {
          answers: this.store.getBy('id', questionId)?.answers?.filter((a) => a.id !== answerId) || []
        });
      })
    );
  }
}
