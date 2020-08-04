import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Store, getValue, Actions } from '@ngxs/store';
import { AbstractLoading } from './abstract-loading';
import { skip, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[ngxsStateWatchLoading]'
})
export class NgxsStateWatchLoadingDirective extends AbstractLoading implements OnInit {
  @Input('ngxsStateWatchLoading')
  path: string;
  constructor(private store: Store, protected elem: ElementRef, protected action$: Actions) {
    super(elem, action$);
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
          } else {
            this.onRemoveActive();
            this.onEnable();
          }
        });
    }
  }
}
