import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// if (environment.production) {
//   enableProdMode();
// }

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
// bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
