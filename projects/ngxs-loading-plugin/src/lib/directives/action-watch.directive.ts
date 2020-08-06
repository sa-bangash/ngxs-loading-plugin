import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Actions } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { AbstractLoading } from './abstract-loading';
import { Router } from '@angular/router';

@Directive({
  selector: '[ngxsActionWatchLoading]'
})
export class NgxsActionWatchDirective extends AbstractLoading implements OnInit {
  @Input('ngxsActionWatchLoading')
  action: string | { type: string };

  constructor(protected elem: ElementRef, protected action$: Actions, protected router: Router) {
    super(elem, action$, router);
  }
  ngOnInit(): void {
    this.watchAction();
  }
}
