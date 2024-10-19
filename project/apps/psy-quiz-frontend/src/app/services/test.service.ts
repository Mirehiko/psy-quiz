import { Injectable, inject } from '@angular/core';
import { QuestionResponseDto, TestResponseDto } from '@shared/dto';
import { IResponse } from '@shared/interfaces';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TestRestService } from '../rest';
import { TestStore } from '../store';
import { BaseService } from './base.service';

@Injectable()
export class TestService extends BaseService<TestResponseDto> {
  protected api = inject(TestRestService);
  public testQuestions$ = new BehaviorSubject<QuestionResponseDto[]>([]);
  protected store = inject(TestStore);

  public getQuestions(id: string): Observable<IResponse<QuestionResponseDto[]>> {
    return this.api.getQuestions(id).pipe(
      tap((questions) => {
        this.testQuestions$.next(questions.data);
      })
    );
  }

  public addQuestions(id: string, requestDto: any): Observable<IResponse<QuestionResponseDto>> {
    return this.api.addQuestion(id, requestDto).pipe(
      tap((question) => {
        this.testQuestions$.next([...this.testQuestions$.value, question.data]);
      })
    );
  }
}
