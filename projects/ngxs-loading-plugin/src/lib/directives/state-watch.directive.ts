import { Directive, ElementRef, Input, OnInit, Inject } from '@angular/core';
import { Store, getValue, Actions } from '@ngxs/store';
import { AbstractLoading } from './abstract-loading';
import { skip, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IConfig } from './interface';

@Directive({
  selector: '[ngxsStateWatchLoading]'
})
export class NgxsStateWatchLoadingDirective extends AbstractLoading implements OnInit {
  @Input('ngxsStateWatchLoading')
  path: string;
  constructor(
    private store: Store,
    protected elem: ElementRef,
    protected action$: Actions,
    protected router: Router,
    @Inject('config') protected configService: IConfig
  ) {
    super(elem, action$, router, configService);
  }

  ngOnInit(): void {
    if (this.path) {
      this.store
        .select(state => getValue(state, this.path))
        .pipe(
          skip(1),
          takeUntil(this.subscription)
        )
        .subscribe(resp => {
          if (resp) {
            this.onActive();
            this.onDisabled();
            this.navigateByUrl();
            this.onSuccessAction.emit();
          } else {
            this.onRemoveActive();
            this.onEnable();
          }
        });
    }
  }
}
