import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigationModule } from '@components';
import { QuestionService, RunService, TestService, UserService } from '@services';
import { QuestionRestService, RunRestService, TestRestService, UserRestService } from '../../rest';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRoutingModule, NavigationModule],
  providers: [
    TestService,
    TestRestService,
    UserService,
    UserRestService,
    RunRestService,
    RunService,
    QuestionRestService,
    QuestionService
  ]
})
export class AdminModule {}
