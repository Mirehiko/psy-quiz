import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { QuestionService, RunService, TestService } from '@services';
import { TestStore } from '@store';
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
  private runService = inject(RunService);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  public test: any;
  public questions: any[] = [];

  constructor() {
    this.route.params
      .pipe(
        filter((params) => {
          console.warn(params);
          return params['testId'];
        }),
        map((params) => params['testId']),
        switchMap((testId) =>
          this.testService.getOne(testId).pipe(switchMap(() => this.testService.getQuestions(testId)))
        )
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {});

    this.testStore.entity$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((entity) => {
      this.test = entity;
      console.warn(entity);
      this.cdr.markForCheck();
    });

    this.testService.testQuestions$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((entities) => {
      this.questions = entities;
      console.warn(entities);
      this.cdr.markForCheck();
    });
  }
}
