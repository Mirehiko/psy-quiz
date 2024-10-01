import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@services';
import { switchMap } from 'rxjs';

@Component({
  selector: 'admin-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEditComponent {
  public formGroup: FormGroup;
  public isEdit = false;
  public user: any | undefined = undefined;
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', Validators.required),
      password: new FormControl('')
      // form array
    });
    this.route.params.subscribe((params) => {
      this.isEdit = !!params['id'];
      if (this.isEdit) {
        this.userService
          .getOne(params['id'])
          .pipe(
            takeUntilDestroyed(this.destroyRef),
            switchMap(() => this.userService.entity$)
          )
          .subscribe((user) => {
            this.user = user;
            this.formGroup = new FormGroup({
              email: new FormControl(user.email, [Validators.required, Validators.email]),
              name: new FormControl(user.name),
              password: new FormControl('')
              // form array
            });
            this.cdr.markForCheck();
          });
        return;
      }
    });
  }

  update(requestDto: any): void {
    this.userService
      .update(this.user.id, requestDto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        // this.formGroup.reset();
        // this.router.navigate(['..']);
      });
  }

  create(requestDto: any): void {
    this.userService
      .create(requestDto)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.formGroup.reset();
        // this.router.navigate(['..']);
      });
  }

  clickHandler(): void {
    const requestDto: { name?: string; email: string; password?: string } = {
      name: this.formGroup.get('name')?.value,
      email: this.formGroup.get('email')?.value,
      password: this.formGroup.get('password')?.value
    };
    if (this.isEdit) {
      this.update(requestDto);
    } else {
      this.create(requestDto);
    }
  }
}
