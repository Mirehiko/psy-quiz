import { Injectable } from '@angular/core';
import { QuestionResponseDto, TestResponseDto, TestRunResponseDto } from '@shared/dto';
import { IResponse } from '@shared/interfaces';
import { Observable, from } from 'rxjs';
import { BaseRestService } from './base-rest.service';

@Injectable()
export class TestRestService extends BaseRestService<TestResponseDto> {
  protected apiUrl = 'test';

  public getActiveRun(testId: string): Observable<IResponse<TestRunResponseDto>> {
    return from(this.http.get<IResponse<TestRunResponseDto>>(`${this.baseUrl}/${this.apiUrl}/${testId}/active-run`));
  }

  public getQuestions(id: string): Observable<IResponse<QuestionResponseDto[]>> {
    return from(this.http.get<IResponse<QuestionResponseDto[]>>(`${this.baseUrl}/${this.apiUrl}/${id}/questions`));
  }

  public addQuestion(id: string, requestDto: any): Observable<IResponse<QuestionResponseDto>> {
    return from(
      this.http.post<IResponse<QuestionResponseDto>>(`${this.baseUrl}/${this.apiUrl}/${id}/question`, requestDto)
    );
  }
}
