import { Injectable, inject } from '@angular/core';
import { QuestionResponseDto, TestResponseDto } from '@shared/dto';
import { IResponse } from '@shared/interfaces';
import { Observable, tap } from 'rxjs';
import { TestRestService } from '../rest';
import { QuestionStore, TestStore } from '../store';
import { BaseService } from './base.service';

@Injectable()
export class TestService extends BaseService<TestResponseDto> {
  protected api = inject(TestRestService);
  protected store = inject(TestStore);
  protected questionStore = inject(QuestionStore);

  public getQuestions(id: string): Observable<IResponse<QuestionResponseDto[]>> {
    return this.api.getQuestions(id).pipe(tap((questions) => this.questionStore.add(questions.data)));
  }

  public addQuestions(id: string, requestDto: any): Observable<IResponse<QuestionResponseDto>> {
    return this.api.addQuestion(id, requestDto).pipe(tap((question) => this.questionStore.add([question.data])));
  }
}
