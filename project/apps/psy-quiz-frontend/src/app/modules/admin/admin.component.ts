import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../auth';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent {
  private authService = inject(AuthService);
  public tests: any[] = [];

  public get user() {
    return this.authService.user;
  }

  constructor() {
    this.authService.getUser().subscribe();
  }
}
