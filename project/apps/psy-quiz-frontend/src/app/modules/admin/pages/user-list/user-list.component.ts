import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../../../services';

@Component({
  selector: 'admin-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  private userService = inject(UserService);

  public get users$(): Observable<any> {
    return this.userService.entities$
  }

  constructor() {
    this.userService.getAll().subscribe()
  }
}
