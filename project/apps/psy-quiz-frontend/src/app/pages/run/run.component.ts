import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { RunService, TestService } from '@services';
import { QuestionResponseDto, TestResponseDto } from '@shared/dto';
import { QuestionStore, RunStore, TestStore } from '@store';
import { filter, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RunComponent {
  private testService = inject(TestService);
  private testStore = inject(TestStore);
  private questionStore = inject(QuestionStore);
  private runService = inject(RunService);
  private runStore = inject(RunStore);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  public test: TestResponseDto;
  public questions: QuestionResponseDto[] = [];

  constructor() {
    this.route.params
      .pipe(
        filter((params) => {
          return params['testId'];
        }),
        map((params) => params['testId']),
        switchMap((testId) =>
          this.testService.getOne(testId).pipe(switchMap(() => this.testService.getQuestions(testId)))
        )
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {});

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
}
