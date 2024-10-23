import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@auth';
import { RunService, TestService } from '@services';
import { TestResponseDto, TestRunResponseDto } from '@shared/dto';
import { RunStore, TestStore } from '@store';
import { filter, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestDetailsComponent {
  public test: TestResponseDto;
  public run: TestRunResponseDto | undefined = undefined;
  private testService = inject(TestService);
  private testStore = inject(TestStore);
  private runStore = inject(RunStore);
  private runService = inject(RunService);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  constructor() {
    this.route.params
      .pipe(
        filter((params) => {
          return params['testId'];
        }),
        map((params) => params['testId']),
        takeUntilDestroyed(this.destroyRef),
        switchMap((testId) =>
          this.testService.getOne(testId).pipe(
            switchMap(() => this.testStore.entity$),
            takeUntilDestroyed(this.destroyRef)
          )
        )
      )
      .pipe(
        filter((test) => test !== undefined),
        tap((test) => {
          this.test = test;
          console.warn(test.id);
          this.cdr.markForCheck();
        }),
        takeUntilDestroyed(this.destroyRef),
        switchMap((test) => this.testService.getActiveRun(test.id).pipe(switchMap(() => this.runStore.entity$)))
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((run) => {
        this.run = run;
        this.cdr.markForCheck();
      });
  }

  public startTest(): void {
    let runId: string;
    this.runService
      .create({
        name: '',
        userId: this.authService.user$.value.id,
        testId: this.test.id
      })
      .pipe(
        tap((resp) => (runId = resp.data.id)),
        switchMap((resp) => this.runService.start(resp.data.id))
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.router.navigate(['run', runId], { relativeTo: this.route });
      });
  }

  public continueTest(): void {
    this.router.navigate(['run', this.run?.id], { relativeTo: this.route });
  }
}
