import { BootController } from './app/core/common/boot/boot';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';

if (environment.production) {
  enableProdMode();
}

const init = () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => (<any>Window).appBootstrap && (<any>window).appBootstrap())
  .catch(err => console.error('NG Bootstrap Error =>', err));
};

init();

const boot = BootController.getbootControl().watchReboot().subscribe(() => init());
