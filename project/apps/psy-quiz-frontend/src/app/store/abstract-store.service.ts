import { BehaviorSubject, Observable } from 'rxjs';

export abstract class AbstractStoreService<T extends { id?: string }> {
  public entities$ = new BehaviorSubject<T[]>([]);
  public entity$ = new BehaviorSubject<T | undefined>(undefined);
  private entities = new Map<string, T>();

  public add(entities: T[]): void {
    entities.forEach((entity: T) => {
      this.entities.set(entity.id!, entity);
    });
    this.entities$.next(Array.from(this.entities.values()));
  }

  public update(id: string, entity: Partial<T>): void {
    this.entities.set(id, { ...this.entities.get(id), ...entity } as T);
    this.entities$.next(Array.from(this.entities.values()));
    if (this.entity$.value?.id === id) {
      this.entity$.next(this.entities.get(id));
    }
  }

  public remove(id: string): void {
    this.entities.delete(id);
    this.entities$.next(Array.from(this.entities.values()));
  }

  public select(id: string | T | undefined): void {
    if (typeof id === 'string') {
      this.entity$.next(this.entities.get(id!));
    } else {
      this.entity$.next(id);
    }
  }
}
