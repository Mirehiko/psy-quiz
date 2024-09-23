import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SocketIoService } from '@services';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthRestService, AuthService } from './modules';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, BrowserModule, BrowserAnimationsModule, HttpClientModule],
  providers: [HttpClient, AuthRestService, AuthService, SocketIoService],
  bootstrap: [AppComponent]
})
export class AppModule {}
