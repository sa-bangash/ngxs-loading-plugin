import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { LoadingState } from './loading/loading.state';
import { LoadingComponent } from './loading/loading/loading.component';
import { NgxsLoadingPluginModule } from 'ngxs-loading-plugin';
@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([LoadingState]),
    NgxsLoadingPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
