import { Component, inject } from '@angular/core';
import { AuthService } from '../auth';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  private authService = inject(AuthService);
}
