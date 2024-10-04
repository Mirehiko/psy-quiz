import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TestRestService } from '../rest';
import { BaseService } from './base.service';

@Injectable()
export class TestService extends BaseService {
  protected api = inject(TestRestService);
  public testQuestions$ = new BehaviorSubject<any[]>([]);

  public getQuestions(id: number): Observable<any[]> {
    return this.api.getQuestions(id).pipe(
      tap((questions) => {
        this.testQuestions$.next(questions);
      })
    );
  }

  public addQuestions(id: number, requestDto: any): Observable<any> {
    return this.api.addQuestion(id, requestDto).pipe(
      tap((question) => {
        this.testQuestions$.next([...this.testQuestions$.value, question]);
      })
    );
  }
}
