import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RunService, SocketIoService } from '@services';
import { TestRunResponseDto } from '@shared/dto';

@Component({
  selector: 'admin-run-list',
  templateUrl: './run-list.component.html',
  styleUrls: ['./run-list.component.scss']
})
export class RunListComponent {
  private runService = inject(RunService);
  public runs: TestRunResponseDto[] = [];
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.runService.entities$.subscribe((runs) => {
      this.runs = runs;
      this.cdr.markForCheck();
    });
    this.runService.getAll().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  remove(runId: string): void {
    this.runService.remove(runId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
