import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigationModule } from '@components';
import { QuestionRestService, RunRestService, TestRestService, UserRestService } from '@rest';
import { QuestionService, RunService, TestService, UserService } from '@services';
import { QuestionStore, RunStore, TestStore, UserStore } from '@store';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [AdminComponent],
  imports: [CommonModule, AdminRoutingModule, NavigationModule],
  providers: [
    TestService,
    TestRestService,
    TestStore,
    UserService,
    UserRestService,
    UserStore,
    RunRestService,
    RunService,
    RunStore,
    QuestionRestService,
    QuestionService,
    QuestionStore
  ]
})
export class AdminModule {}
