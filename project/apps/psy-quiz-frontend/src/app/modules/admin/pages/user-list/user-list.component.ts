import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SocketIoService, UserService } from '../../../../services';

@Component({
  selector: 'admin-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  private userService = inject(UserService);
  // private socketIoService = inject(SocketIoService);

  public get users$(): Observable<any> {
    return this.userService.entities$;
  }

  constructor() {
    this.userService.getAll().subscribe();
    // this.socketIoService.getOnlineStatuses().subscribe((status) => {});
  }
}
