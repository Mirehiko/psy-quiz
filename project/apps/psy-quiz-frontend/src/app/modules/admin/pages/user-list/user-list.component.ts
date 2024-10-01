import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { SocketIoService, UserService } from '../../../../services';

@Component({
  selector: 'admin-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  public users: any[] = [];
  private userService = inject(UserService);
  private socketIoService = inject(SocketIoService);
  // private socketIoService = inject(SocketIoService);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.userService.entities$.subscribe((users) => {
      this.users = users;
      this.cdr.markForCheck();
    });
    this.userService.getAll().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    this.socketIoService.getOnlineStatuses().subscribe((status) => {
      console.warn('status', status);
    });
  }

  remove(testId: string): void {
    this.userService.remove(testId).pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
  }
}
