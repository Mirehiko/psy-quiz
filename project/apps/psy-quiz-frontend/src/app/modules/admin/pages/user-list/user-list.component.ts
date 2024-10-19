import { ChangeDetectorRef, Component, DestroyRef, OnDestroy, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserResponseDto } from '@common/dto';
import { SocketIoService, UserService } from '@services';
import { Observable, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../auth';

@Component({
  selector: 'admin-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  public users: UserResponseDto[] = [];
  private userService = inject(UserService);
  private socketIoService = inject(SocketIoService);
  private destroyRef = inject(DestroyRef);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  constructor() {
    this.wrapInDestroyRef(
      this.userService.getAll().pipe(
        tap(() => this.subscribeOnOnlineStatuses()),
        switchMap(() => this.userService.entities$)
      )
    ).subscribe((users) => {
      this.users = users;
      this.cdr.markForCheck();
    });
  }

  public remove(testId: string): void {
    this.wrapInDestroyRef(this.userService.remove(testId)).subscribe();
  }

  private subscribeOnOnlineStatuses(): void {
    this.wrapInDestroyRef(this.socketIoService.getOnlineStatus()).subscribe((status) => {
      let updatedUsers = this.userService.entities$.value.map((user) => {
        if (user.id === status.userId) {
          user.onlineStatus = status.status;
        }
        return user;
      });

      status.users?.forEach((u: any) => {
        updatedUsers = updatedUsers.map((user) => {
          if (user.id === u.userId) {
            user.onlineStatus = u.status;
          }
          return user;
        });
      });
      this.userService.entities$.next(updatedUsers);
      this.cdr.markForCheck();
    });
    this.socketIoService.setUpOnlineStatus(this.authService.user$.value?.id);
  }

  private wrapInDestroyRef<T>(observable: Observable<T>): Observable<T> {
    return observable.pipe(takeUntilDestroyed(this.destroyRef));
  }
}
