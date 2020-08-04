import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxsDispatchDirective } from './directives/action-dispatch.directive';
import { NgxsActionWatchDirective } from './directives/action-watch.directive';
import { NgxsStateWatchLoadingDirective } from './directives/state-watch.directive';



@NgModule({
  declarations: [
    NgxsDispatchDirective,
    NgxsActionWatchDirective,
    NgxsStateWatchLoadingDirective
  ],
  exports: [
    NgxsDispatchDirective,
    NgxsActionWatchDirective,
    NgxsStateWatchLoadingDirective
  ],
})
export class NgxsLoadingPluginModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxsLoadingPluginModule
    };
  }
}
