import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestListComponent {
  public tests: any[] = [];
  private testService = inject(TestService);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.testService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((tests) => {
        this.tests = tests.data;
        console.warn(tests);
        this.cdr.markForCheck();
      });
  }
}
