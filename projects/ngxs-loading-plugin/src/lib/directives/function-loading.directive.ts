import { Directive, Input, HostListener, ElementRef, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractLoading } from './abstract-loading';
import { finalize } from 'rxjs/operators';
import { Actions } from '@ngxs/store';
import { Router } from '@angular/router';
import { IConfig } from './interface';

@Directive({
  selector: '[ngxsFunctionLoading]'
})
export class FunctionLoadingDirective extends AbstractLoading {
  @Input('ngxsFunctionLoading')
  fn: () => Observable<any>;

  @HostListener('click')
  onClick() {
    this.onActive();
    this.onDisabled();
    try {
      this.fn()
        .pipe(
          finalize(() => {
            this.onEnable();
          })
        )
        .subscribe(() => {
          this.onSuccess();
        }, (error) => {
          this.onError();
        }
        );
    } catch (error) {
      this.onError();
      this.onEnable();
    }
  }
  constructor(
    protected elem: ElementRef,
    protected action$: Actions,
    protected router: Router,
    @Inject('config') protected configService: IConfig) {
    super(elem, action$, router, configService);
  }

}
