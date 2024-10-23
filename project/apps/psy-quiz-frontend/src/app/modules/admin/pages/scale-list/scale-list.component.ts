import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TestService } from '@services';
import { ScaleService } from '@services/scale.service';
import { ScaleRequestDto, ScaleResponseDto } from '@shared/dto';
import { ScaleStore, TestStore } from '@store';
import { Observable, filter, switchMap } from 'rxjs';

@Component({
  selector: 'scale-list',
  templateUrl: './scale-list.component.html',
  styleUrls: ['./scale-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScaleListComponent {
  public scales: ScaleResponseDto[] = [];
  private scaleStore = inject(ScaleStore);
  private scaleService = inject(ScaleService);
  private testStore = inject(TestStore);
  private testService = inject(TestService);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);

  constructor() {
    this.wrapQuery(
      this.testStore.entity$.pipe(
        filter((test) => test !== undefined),
        switchMap((test) => this.testService.getScales(test.id).pipe(switchMap(() => this.scaleStore.entities$)))
      )
    ).subscribe((scales) => {
      this.scales = scales;
      this.cdr.markForCheck();
    });
  }

  public addScale(): void {
    console.warn(this.testStore.entity$.value);
    this.wrapQuery(
      this.scaleService.create<ScaleRequestDto>({
        name: `scale ${this.scaleStore.entities$.value.length + 1}`,
        description: '',
        testId: this.testStore.entity$.value?.id!
      })
    ).subscribe();
  }

  public remove(scaleID: string): void {
    this.wrapQuery(this.scaleService.remove(scaleID)).subscribe();
  }

  private wrapQuery<T>(observable: Observable<T>): Observable<T> {
    return observable.pipe(takeUntilDestroyed(this.destroyRef));
  }
}
