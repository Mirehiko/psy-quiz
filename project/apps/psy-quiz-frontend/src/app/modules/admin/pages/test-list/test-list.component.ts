import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TestService } from '@services';
import { TestResponseDto } from '@shared/dto';
import { TestStore } from '@store';

@Component({
  selector: 'admin-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestListComponent {
  public tests: TestResponseDto[] = [];
  private testService = inject(TestService);
  private testStore = inject(TestStore);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.testStore.entities$.subscribe((tests) => {
      this.tests = tests;
      this.cdr.markForCheck();
    });
    this.testService.getAll().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  // create(): void {
  //   this.testService.create().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  // }

  remove(testId: string): void {
    this.testService.remove(testId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
