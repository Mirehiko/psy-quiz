import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RunService, TestService, UserService } from '@services';
import { RunRestService, TestRestService, UserRestService } from '../../rest';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRoutingModule],
  providers: [TestService, TestRestService, UserService, UserRestService, RunRestService, RunService]
})
export class AdminModule {}
