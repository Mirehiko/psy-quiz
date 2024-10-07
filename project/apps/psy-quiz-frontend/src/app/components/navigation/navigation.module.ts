import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavigationComponent } from './navigation.component';

@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, RouterLink],
  exports: [NavigationComponent]
})
export class NavigationModule {}
