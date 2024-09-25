import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RunService, TestService, UserService } from '@services';
import { switchMap } from 'rxjs';

@Component({
  selector: 'admin-run-edit',
  templateUrl: './run-edit.component.html',
  styleUrls: ['./run-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RunEditComponent {
  public formGroup: FormGroup;
  public isEdit = false;
  public test: any | undefined = undefined;
  private runService = inject(RunService);
  private testService = inject(RunService);
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

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
            switchMap(() => this.runService.entity$)
          )
          .subscribe((test) => {
            this.test = test;
            this.formGroup = new FormGroup({
              name: new FormControl(test.name, Validators.required),
              description: new FormControl(test.description)
              // form array
            });
            this.cdr.markForCheck();
          });
        return;
      }
    });
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
      .update(this.test.id, requestDto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        // this.router.navigate(['..']);
      });
  }

  clickHandler(): void {
    const requestDto: { name: string; user: string; test: string } = {
      name: this.formGroup.get('name')?.value,
      user: this.formGroup.get('user')?.value,
      test: this.formGroup.get('test')?.value
    };
    if (this.isEdit) {
      this.update(requestDto);
    } else {
      this.create(requestDto);
    }
  }
}
