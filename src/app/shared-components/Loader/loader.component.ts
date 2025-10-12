import { Component } from '@angular/core';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgxUiLoaderModule],
  template: `<ngx-ui-loader></ngx-ui-loader>`,
})
export class LoaderComponent {}
