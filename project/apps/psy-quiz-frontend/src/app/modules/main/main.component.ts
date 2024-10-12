import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { SocketIoService } from '@services';
import { switchMap } from 'rxjs';
import { AuthService } from '../auth';

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent {
  public tests: any[] = [];
  public user: any | undefined = undefined;
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);
  private socketService = inject(SocketIoService);

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
      this.authService
        .getUser()
        .pipe(switchMap(() => this.authService.user$))
        .subscribe((user) => {
          this.user = user;
          this.socketService.connect();
          if (user) {
            this.socketService.setUpOnlineStatus(user.id);
          } else {
            this.socketService.disconnect();
          }

          this.cdr.markForCheck();
        });
    }
  }

  clickHandler($event: any): void {
    this.authService.logout().subscribe();
  }
}
