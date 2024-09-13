import { inject, Injectable } from '@angular/core';
import { TestRestService } from '../rest';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable()
export class TestService {
  private api = inject(TestRestService)
  public tests$ = new BehaviorSubject([])

  public getAll(): Observable<any> {
    return this.api.getAll().pipe(tap(tests => {
      this.tests$.next(tests)
    }))
  }
}
