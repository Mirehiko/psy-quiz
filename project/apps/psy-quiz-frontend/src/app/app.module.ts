import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoService } from '@services';
import { API_SOCKET_TOKEN, API_TOKEN } from './api-token';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor, HttpErrorInterceptor } from './interceptors';
import { AuthRestService, AuthService } from './modules';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, BrowserModule, BrowserAnimationsModule, HttpClientModule],
  providers: [
    {
      provide: API_TOKEN,
      useValue: 'http://localhost:5002/api'
    },
    {
      provide: API_SOCKET_TOKEN,
      useValue: 'ws://localhost:5002'
    },
    HttpClient,
    AuthRestService,
    AuthService,
    SocketIoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
