import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RunService, SocketIoService } from '@services';

@Component({
  selector: 'admin-run-list',
  templateUrl: './run-list.component.html',
  styleUrls: ['./run-list.component.scss']
})
export class RunListComponent {
  private runService = inject(RunService);
  public runs: any[] = [];
  // private socketIoService = inject(SocketIoService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    this.runService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((runs) => {
        this.runs = runs.data;
      });
    // this.socketIoService.getOnlineStatuses().subscribe((status) => {});
  }

  // create(): void {
  //   this.runService.create().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  // }

  remove(runId: string): void {
    this.runService.remove(runId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
