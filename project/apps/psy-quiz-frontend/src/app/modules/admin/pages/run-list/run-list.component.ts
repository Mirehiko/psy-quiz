import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RunService } from '@services';
import { TestRunResponseDto } from '@shared/dto';
import { RunStore } from '@store';

@Component({
  selector: 'admin-run-list',
  templateUrl: './run-list.component.html',
  styleUrls: ['./run-list.component.scss']
})
export class RunListComponent {
  private runService = inject(RunService);
  private runStore = inject(RunStore);
  public runs: TestRunResponseDto[] = [];
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.runStore.entities$.subscribe((runs) => {
      this.runs = runs;
      this.cdr.markForCheck();
    });
    this.runService.getAll().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  remove(runId: string): void {
    this.runService.remove(runId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
