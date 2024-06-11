import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from './auth.component';
import { LoginPageComponent } from './login-page/';


const routes: Routes = [
  {
    path: "login",
    component: LoginPageComponent,
  },
  {
    path: "registration",
    component: LoginPageComponent,
  },
  {
    path: "restore",
    component: LoginPageComponent,
  },
  {
    path: "confirm",
    component: LoginPageComponent,
  },
  {
    path: "",
    component: AuthComponent,
    redirectTo: 'login'
  },
  {
    path: "**",
    redirectTo: "login"
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class AuthRoutingModule {
}
