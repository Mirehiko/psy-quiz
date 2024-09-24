import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TestService } from '../../../../services/test.service';

@Component({
  selector: 'admin-test-add',
  templateUrl: './test-add.component.html',
  styleUrls: ['./test-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestAddComponent {
  public formGroup: FormGroup;
  private testService = inject(TestService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  constructor() {
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('')
      // form array
    });
  }

  create(): void {
    const requestDto: { name: string; description?: string } = {
      name: this.formGroup.get('name')?.value,
      description: this.formGroup.get('description')?.value
    };
    this.testService
      .create(requestDto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.formGroup.reset();
        // this.router.navigate(['..']);
      });
  }
}
