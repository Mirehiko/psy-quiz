import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginPageComponent } from './login-page';

@NgModule({
  declarations: [AuthComponent, LoginPageComponent],
  imports: [CommonModule, ReactiveFormsModule, AuthRoutingModule],
  exports: [FormsModule, CommonModule, RouterModule]
})
export class AuthModule {}
