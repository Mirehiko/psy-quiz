import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { AuthService } from '@auth';
import { switchMap } from 'rxjs';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  public tests: any[] = [];
  public user: any | undefined = undefined;

  menuItems: any[] = [
    {
      title: 'Home',
      url: 'home'
    },
    {
      title: 'Users',
      url: 'user'
    },
    {
      title: 'Tests',
      url: 'test'
    },
    {
      title: 'Runs',
      url: 'run'
    }
  ];

  constructor() {
    if (this.authService.getToken()) {
      this.authService
        .getUser()
        .pipe(switchMap(() => this.authService.user$))
        .subscribe((user) => {
          this.user = user;
          this.cdr.markForCheck();
        });
    }
  }

  clickHandler($event: any): void {
    this.authService.logout().subscribe();
  }
}
