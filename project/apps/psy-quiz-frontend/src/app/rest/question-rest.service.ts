import { Injectable } from '@angular/core';
import { QuestionAnswerResponseDto, QuestionResponseDto } from '@shared/dto';
import { IResponse } from '@shared/interfaces';
import { Observable, from } from 'rxjs';
import { BaseRestService } from './base-rest.service';

@Injectable()
export class QuestionRestService extends BaseRestService<QuestionResponseDto> {
  protected apiUrl = 'question';

  public addAnswer(questionId: string, requestDto: any): Observable<IResponse<QuestionAnswerResponseDto>> {
    return from(
      this.http.post<IResponse<QuestionAnswerResponseDto>>(
        `${this.baseUrl}/${this.apiUrl}/${questionId}/answer`,
        requestDto
      )
    );
  }

  public updateAnswer(
    questionId: string,
    answerId: string,
    requestDto: any
  ): Observable<IResponse<QuestionAnswerResponseDto>> {
    return from(
      this.http.patch<IResponse<QuestionAnswerResponseDto>>(
        `${this.baseUrl}/${this.apiUrl}/${questionId}/answer/${answerId}`,
        requestDto
      )
    );
  }

  public removeAnswer(questionId: string, answerId: string): Observable<any> {
    return from(this.http.delete(`${this.baseUrl}/${this.apiUrl}/${questionId}/answer/${answerId}`));
  }
}
