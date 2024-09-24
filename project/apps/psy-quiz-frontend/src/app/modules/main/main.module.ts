import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { TestRestService } from '../../rest';
import { TestService } from '../../services/test.service';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule],
  providers: [TestRestService, TestService]
})
export class MainModule {}
