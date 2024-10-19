import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RunService, TestService, UserService } from '@services';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'admin-run-edit',
  templateUrl: './run-edit.component.html',
  styleUrls: ['./run-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RunEditComponent {
  public formGroup: FormGroup;
  public isEdit = false;
  public run: any | undefined = undefined;
  private runService = inject(RunService);
  private testService = inject(TestService);
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  public users: any[] = [];
  public tests: any[] = [];

  constructor() {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required),
      test: new FormControl('', Validators.required),
      startDate: new FormControl(''), // TODO: подумать о запланированных мероприятиях
      endDate: new FormControl('')
      // form array
    });
    this.route.params.subscribe((params) => {
      this.isEdit = !!params['id'];
      if (this.isEdit) {
        this.runService
          .getOne(params['id'])
          .pipe(
            takeUntilDestroyed(this.destroyRef),
            filter((test) => test !== null),
            switchMap(() => this.runService.entity$.pipe(filter((run) => run !== null)))
          )
          .subscribe((run) => {
            this.run = run;
            this.formGroup = new FormGroup({
              name: new FormControl(run.name, Validators.required),
              description: new FormControl(run.description)
              // form array
            });
            this.cdr.markForCheck();
          });
        return;
      }
    });

    this.testService.entities$.subscribe((tests) => {
      this.tests = tests;
      this.cdr.markForCheck();
    });

    this.userService.entities$.subscribe((users) => {
      this.users = users;
      this.cdr.markForCheck();
    });

    this.userService.getAll().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    this.testService.getAll().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }

  create(requestDto: any): void {
    this.runService
      .create(requestDto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.formGroup.reset();
        // this.router.navigate(['..']);
      });
  }

  update(requestDto: any): void {
    this.runService
      .update(this.run.id, requestDto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        // this.router.navigate(['..']);
      });
  }

  clickHandler(): void {
    const requestDto: { name: string; userId: string; testId: string } = {
      name: this.formGroup.get('name')?.value,
      userId: this.formGroup.get('user')?.value,
      testId: this.formGroup.get('test')?.value
    };
    if (this.isEdit) {
      this.update(requestDto);
    } else {
      this.create(requestDto);
    }
  }
}
