import { Directive, ElementRef, HostListener, Input, OnInit, OnDestroy, Inject } from '@angular/core';
import { Store, Actions } from '@ngxs/store';
import { AbstractLoading } from './abstract-loading';
import { Router } from '@angular/router';
import { IConfig } from './interface';

@Directive({
  selector: '[ngxsDispatchLoading]'
})
export class NgxsDispatchDirective extends AbstractLoading implements OnInit, OnDestroy {
  @Input('ngxsDispatchLoading')
  action: string | { type: string };

  @HostListener('click')
  onClick() {
    this.onActive();
    this.onDisabled();
    this.store.dispatch(this.getActionObject());
  }

  constructor(
    private store: Store,
    protected elem: ElementRef,
    protected action$: Actions,
    protected router: Router,
    @Inject('config') protected configService: IConfig
  ) { super(elem, action$, router, configService); }

  ngOnInit(): void {
    this.watchAction();
  }
}
