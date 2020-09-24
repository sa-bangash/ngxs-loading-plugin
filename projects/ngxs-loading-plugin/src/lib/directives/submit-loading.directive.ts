import { Directive, Input, HostListener, ElementRef, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AbstractLoading } from './abstract-loading';
import { finalize } from 'rxjs/operators';
import { Actions } from '@ngxs/store';
import { Router } from '@angular/router';
import { IConfig } from './interface';

@Directive({
  selector: '[ngxsSubmitLoading]'
})
export class SubmitLoadingDirective extends AbstractLoading {
  @Input('ngxsSubmitLoading')
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
            this.onRemoveActive();
          })
        )
        .subscribe(() => {
          this.onSuccess();
          this.navigateByUrl();
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
