import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { AuthService } from '../auth';

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
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
      title: 'Tests',
      url: 'tests'
    }
  ];

  constructor() {
    if (this.authService.getToken()) {
      this.authService.getUser().subscribe((user) => {
        this.user = this.authService.user;
        this.cdr.markForCheck();
      });
    }
  }

  clickHandler($event: any): void {
    this.authService.logout().subscribe();
  }
}
