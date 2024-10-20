import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { RunService, TestService } from '@services';
import { QuestionResponseDto, TestResponseDto, TestRunResponseDto } from '@shared/dto';
import { QuestionStore, RunStore, TestStore } from '@store';
import { filter, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RunComponent {
  public test: TestResponseDto;
  public questions: QuestionResponseDto[] = [];
  public run: TestRunResponseDto;
  public isAllAnswered: boolean = false;
  private runId: string;
  private testService = inject(TestService);
  private testStore = inject(TestStore);
  private questionStore = inject(QuestionStore);
  private runService = inject(RunService);
  private runStore = inject(RunStore);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

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
            this.isAllAnswered = this.run.answers?.length === this.questions.length;
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

    this.questionStore.entities$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((questions) => {
      this.questions = questions;
      this.cdr.markForCheck();
    });
  }

  public finish(): void {
    this.runService
      .finish(this.runId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.router.navigate(['results'], { relativeTo: this.route });
      });
  }
}
