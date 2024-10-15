import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { RunService, TestService } from '@services';
import { filter, map, switchMap, tap } from 'rxjs';
import { AuthService } from '../../modules';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestDetailsComponent {
  public test: any;
  private testService = inject(TestService);
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
          console.warn(params);
          return params['testId'];
        }),
        map((params) => params['testId']),
        switchMap((testId) => this.testService.getOne(testId))
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {});
    this.testService.entity$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((entity) => {
      this.test = entity;
      this.cdr.markForCheck();
    });
  }

  public startTest(): void {
    let runId: string;
    this.runService
      .create({
        name: '',
        userId: this.authService.user$.value.id.toString(),
        testId: this.test.id.toString()
      })
      .pipe(
        tap((resp) => (runId = resp.data.id)),
        switchMap((resp) => this.runService.start(resp.data.id))
      )
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.router.navigate(['run', runId]);
      });
  }

  public continueTest(): void {
    this.router.navigate(['run', 2], { relativeTo: this.route });
  }
}
