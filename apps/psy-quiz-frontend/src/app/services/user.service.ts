import { inject, Injectable } from '@angular/core';
import { UserRestService } from '../rest';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable()
export class UserService {
  private api = inject(UserRestService)
  public users$ = new BehaviorSubject([])

  public getAll(): Observable<any> {
    return this.api.getAll().pipe(tap(users => {
      this.users$.next(users)
    }))
  }
}
