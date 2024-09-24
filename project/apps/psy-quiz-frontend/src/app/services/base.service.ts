import { BehaviorSubject, Observable, tap } from 'rxjs';
import { BaseRestService } from '../rest';

export abstract class BaseService {
  protected abstract api: BaseRestService;
  public entities$ = new BehaviorSubject<any[]>([]);
  public entity$ = new BehaviorSubject<any>(null);

  public getAll(): Observable<any> {
    return this.api.getAll().pipe(
      tap((entities) => {
        this.entities$.next(entities.data);
      })
    );
  }

  public getOne(id: string): Observable<any> {
    return this.api.getOne(id).pipe(
      tap((entities) => {
        this.entity$.next(entities);
      })
    );
  }

  public create(requestDto: any): Observable<any> {
    return this.api.create(requestDto).pipe(
      tap((entity) => {
        this.entities$.next([...this.entities$.value!, entity]);
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
