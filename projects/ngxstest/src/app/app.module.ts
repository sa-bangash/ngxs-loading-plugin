import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { LoadingState } from './loading/loading.state';
import { LoadingComponent } from './loading/loading/loading.component';
import { NgxsLoadingPluginModule } from 'ngxs-loading-plugin';
import { RouterModule } from '@angular/router';
import { router } from './app.module.route';
import { TOASTER_CONFIG } from 'projects/ngxs-loading-plugin/src/lib/ngxs-loading-plugin.module';
class Toaster {
  onSuccess() {

  }
}
@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent
  ],
  imports: [
    RouterModule.forRoot(router),
    BrowserModule,
    NgxsModule.forRoot([LoadingState]),
    NgxsLoadingPluginModule.forRoot(),
  ],
  providers: [
    {
      provide: TOASTER_CONFIG,
      useClass: function ()
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
