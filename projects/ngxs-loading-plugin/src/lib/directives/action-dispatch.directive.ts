import { Directive, ElementRef, HostListener, Input, OnInit, OnDestroy } from '@angular/core';
import { Store, Actions } from '@ngxs/store';
import { AbstractLoading } from './abstract-loading';

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

  constructor(private store: Store, protected elem: ElementRef, protected action$: Actions) {
    super(elem, action$);
  }

  ngOnInit(): void {
    this.watchAction();
  }
}
