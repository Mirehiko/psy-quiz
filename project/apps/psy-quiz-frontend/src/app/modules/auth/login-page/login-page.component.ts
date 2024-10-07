import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup;
  aSub: Subscription = new Subscription();

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  async submit(): Promise<void> {
    this.form.disable();
    if (!this.form.invalid) {
      const user = this.form.value;
      this.aSub.add(
        this.authService
          .login(user)
          .pipe(
            catchError((e) => {
              this.form.enable();
              return of(e);
            })
          )
          .subscribe(() => {
            this.router.navigate(['/main']);
            this.form.enable();
          })
      );
    } else {
      this.form.enable();
    }
  }

  public onClick(): void {
    // @todo: restore pass form
  }
}
