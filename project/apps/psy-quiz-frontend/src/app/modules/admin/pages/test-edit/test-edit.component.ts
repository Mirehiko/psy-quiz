import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '@services';
import { switchMap } from 'rxjs';

@Component({
  selector: 'admin-test-edit',
  templateUrl: './test-edit.component.html',
  styleUrls: ['./test-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestEditComponent {
  public formGroup: FormGroup;
  public isEdit = false;
  public test: any | undefined = undefined;
  private testService = inject(TestService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('')
      // form array
    });
    this.route.params.subscribe((params) => {
      this.isEdit = !!params['id'];
      if (this.isEdit) {
        this.testService
          .getOne(params['id'])
          .pipe(
            takeUntilDestroyed(this.destroyRef),
            switchMap(() => this.testService.entity$)
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
    this.testService
      .create(requestDto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.formGroup.reset();
        // this.router.navigate(['..']);
      });
  }

  update(requestDto: any): void {
    this.testService
      .update(this.test.id, requestDto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        // this.formGroup.reset();
        // this.router.navigate(['..']);
      });
  }

  clickHandler(): void {
    const requestDto: { name: string; description?: string } = {
      name: this.formGroup.get('name')?.value,
      description: this.formGroup.get('description')?.value
    };
    if (this.isEdit) {
      this.update(requestDto);
    } else {
      this.create(requestDto);
    }
  }
}
