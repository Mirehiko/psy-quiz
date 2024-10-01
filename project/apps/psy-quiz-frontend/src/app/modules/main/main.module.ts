import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigationModule } from '@components';
import { TestRestService } from '@rest';
import { TestService } from '@services';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, NavigationModule],
  providers: [TestRestService, TestService]
})
export class MainModule {}
