import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { importProvidersFrom } from '@angular/core';
import { App } from './app/app';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideAnimationsAsync(),
    importProvidersFrom(
      NgxUiLoaderModule,
      NgxUiLoaderModule.forRoot({
        fgsType: 'square-jelly-box',
        fgsColor: '#4a99ffff',
        fgsSize: 100,
        hasProgressBar: true,
        pbColor: '#4a99ffff',
        pbThickness: 4,
        overlayColor: 'rgba(0,0,0,0.4)',
        text: 'Cargando información...',
        textColor: '#FFF',
        textPosition: 'center-center',
      }),
      NgxUiLoaderRouterModule
    ),
  ],
}).catch((err) => console.error(err));
