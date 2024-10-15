import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigationModule } from '@components';
import { RunRestService, TestRestService } from '@rest';
import { RunService, TestService } from '@services';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, NavigationModule],
  providers: [TestRestService, TestService, RunRestService, RunService]
})
export class MainModule {}
