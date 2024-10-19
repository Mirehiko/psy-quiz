import { IResponse } from '@shared/interfaces';
import { Observable, tap } from 'rxjs';
import { BaseRestService } from '../rest';
import { AbstractStoreService } from '../store';

export abstract class BaseService<T extends { id?: string }> {
  protected abstract api: BaseRestService<T>;
  protected abstract store: AbstractStoreService<T>;

  public getAll(): Observable<IResponse<T[]>> {
    return this.api.getAll().pipe(tap((entities) => this.store.add(entities.data)));
  }

  public getOne(id: string): Observable<IResponse<T>> {
    return this.api.getOne(id).pipe(tap((entity) => this.store.select(entity.data)));
  }

  public update(id: string, requestDto: any): Observable<IResponse<T>> {
    return this.api.update(id, requestDto).pipe(tap((entity) => this.store.update(id, entity.data)));
  }

  public create(requestDto: any): Observable<IResponse<T>> {
    return this.api.create(requestDto).pipe(tap((entity) => this.store.add([entity.data])));
  }

  public remove(id: string): Observable<any> {
    return this.api.remove(id).pipe(tap((resp) => this.store.remove(id)));
  }
}
