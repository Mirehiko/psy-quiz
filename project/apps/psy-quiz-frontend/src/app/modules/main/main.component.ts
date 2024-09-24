import { Component, inject } from '@angular/core';
import { AuthService } from '../auth';

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  private authService = inject(AuthService);
  public tests: any[] = []

  public get user() {
    return this.authService.user;
  }

  constructor() {
    if (this.authService.getToken()) {
      this.authService.getUser().subscribe()
    }
  }
}
