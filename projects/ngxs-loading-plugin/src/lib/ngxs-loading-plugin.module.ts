import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxsDispatchDirective } from './directives/action-dispatch.directive';
import { NgxsActionWatchDirective } from './directives/action-watch.directive';
import { NgxsStateWatchLoadingDirective } from './directives/state-watch.directive';
import { IConfig } from './directives/interface';
import { DEFAULT_CONFIG } from './directives/constant';

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
  static forRoot(config: IConfig = DEFAULT_CONFIG): ModuleWithProviders {
    return {
      ngModule: NgxsLoadingPluginModule,
      providers: [
        {
          provide: 'config', useValue: config,
        }
      ]
    };
  }
}
