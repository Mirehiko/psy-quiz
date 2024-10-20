import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { RunService, TestService } from '@services';
import { TestResponseDto, TestRunResponseDto } from '@shared/dto';
import { RunStore, TestStore } from '@store';
import { filter, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'run-results',
  templateUrl: './run-results.component.html',
  styleUrls: ['./run-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RunResultsComponent {
  public test: TestResponseDto;
  public run: TestRunResponseDto;
  private testService = inject(TestService);
  private testStore = inject(TestStore);
  private runService = inject(RunService);
  private runStore = inject(RunStore);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private runId: string;

  constructor() {
    this.route.params
      .pipe(
        filter((params) => {
          return params['testId'] && params['runId'];
        }),
        map((params) => ({
          testId: params['testId'],
          runId: params['runId']
        })),
        tap((params) => {
          this.runId = params.runId;
        }),
        switchMap((params) =>
          this.testService.getOne(params.testId).pipe(switchMap(() => this.testService.getQuestions(params.testId)))
        )
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.runService
          .getOne(this.runId)
          .pipe(switchMap((run) => this.runStore.entity$))
          .pipe(
            filter((run) => run !== undefined),
            takeUntilDestroyed(this.destroyRef)
          )
          .subscribe((run) => {
            this.run = run;
            this.cdr.markForCheck();
          });
      });

    this.testStore.entity$
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter((test) => test !== undefined)
      )
      .subscribe((test) => {
        this.test = test;
        this.cdr.markForCheck();
      });
  }
}
