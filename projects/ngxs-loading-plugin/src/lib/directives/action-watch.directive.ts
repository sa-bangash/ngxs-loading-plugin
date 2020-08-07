import { Directive, ElementRef, Input, OnInit, Inject } from '@angular/core';
import { Actions } from '@ngxs/store';
import { AbstractLoading } from './abstract-loading';
import { Router } from '@angular/router';
import { IConfig } from './interface';

@Directive({
  selector: '[ngxsActionWatchLoading]'
})
export class NgxsActionWatchDirective extends AbstractLoading implements OnInit {
  @Input('ngxsActionWatchLoading')
  action: string | { type: string };

  constructor(
    protected elem: ElementRef,
    protected action$: Actions,
    protected router: Router,
    @Inject('config') protected configService: IConfig) {
    super(elem, action$, router, configService);
  }
  ngOnInit(): void {
    this.watchAction();
  }
}
