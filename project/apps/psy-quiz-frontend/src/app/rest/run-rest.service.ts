import { Injectable } from '@angular/core';
import { RunAnswerRequestDto, RunAnswerResponseDto, TestRunResponseDto } from '@shared/dto';
import { Result } from '@shared/dto/results.dto';
import { IResponse } from '@shared/interfaces';
import { Observable, from } from 'rxjs';
import { BaseRestService } from './base-rest.service';

@Injectable()
export class RunRestService extends BaseRestService<TestRunResponseDto> {
  protected apiUrl = 'test-run';

  public sendAnswer(runId: string, requestDto: RunAnswerRequestDto): Observable<IResponse<RunAnswerResponseDto>> {
    return from(
      this.http.post<IResponse<RunAnswerResponseDto>>(`${this.baseUrl}/${this.apiUrl}/${runId}/answer`, requestDto)
    );
  }

  public getResults(runId: string): Observable<IResponse<Result>> {
    return from(this.http.get<IResponse<Result>>(`${this.baseUrl}/${this.apiUrl}/${runId}/results`));
  }

  public start(id: string): Observable<any> {
    return from(this.http.patch(`${this.baseUrl}/${this.apiUrl}/${id}/start`, undefined));
  }

  public finish(id: string): Observable<any> {
    return from(this.http.patch(`${this.baseUrl}/${this.apiUrl}/${id}/finish`, undefined));
  }
}
