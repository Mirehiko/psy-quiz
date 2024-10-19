import { IResponse } from '@shared/interfaces';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BaseRestService } from '../rest';

export abstract class BaseService<T extends { id?: string }> {
  protected abstract api: BaseRestService<T>;
  public entities$ = new BehaviorSubject<T[]>([]);
  public entity$ = new BehaviorSubject<T | null>(null);

  public getAll(): Observable<IResponse<T[]>> {
    return this.api.getAll().pipe(
      tap((entities) => {
        this.entities$.next(entities.data);
      })
    );
  }

  public getOne(id: string): Observable<IResponse<T>> {
    return this.api.getOne(id).pipe(
      tap((entity) => {
        this.entity$.next(entity.data);
      })
    );
  }

  public update(id: string, requestDto: any): Observable<IResponse<T>> {
    return this.api.update(id, requestDto).pipe(
      tap((entity) => {
        this.entities$.next([...this.entities$.value.map((user) => (user.id === id ? entity.data : user))]);
        this.entity$.next(entity.data);
      })
    );
  }

  public create(requestDto: any): Observable<IResponse<T>> {
    return this.api.create(requestDto).pipe(
      tap((entity) => {
        this.entities$.next([...this.entities$.value!, entity.data]);
      })
    );
  }

  public remove(id: string): Observable<any> {
    return this.api.remove(id).pipe(
      tap((resp) => {
        this.entities$.next(this.entities$.value.filter((entity) => entity.id !== id));
      })
    );
  }
}
