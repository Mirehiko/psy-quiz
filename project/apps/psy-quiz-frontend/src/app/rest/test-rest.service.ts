import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { BaseRestService } from './base-rest.service';

@Injectable()
export class TestRestService extends BaseRestService {
  protected apiUrl = 'test';

  public getQuestions(id: number): Observable<any> {
    return from(this.http.get(`${this.baseUrl}/${this.apiUrl}/${id}/questions`));
  }

  public addQuestion(id: number, requestDto: any): Observable<any> {
    return from(this.http.post(`${this.baseUrl}/${this.apiUrl}/${id}/question`, requestDto));
  }
}
