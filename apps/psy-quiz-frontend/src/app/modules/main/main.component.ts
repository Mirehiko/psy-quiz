import { Component, inject } from '@angular/core';
import { AuthService } from '../auth';

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  private authService = inject(AuthService);

  public get user() {
    return this.authService.user;
  }
  constructor() {
    console.warn('asdfasdf');
    console.warn(this.authService.user);
  }
}
