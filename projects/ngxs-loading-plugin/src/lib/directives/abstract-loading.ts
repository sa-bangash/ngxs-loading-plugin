import { ElementRef, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ofActionErrored, ofActionSuccessful, ofActionDispatched, Actions } from '@ngxs/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
const CSS_CLASS_NAMES = {
  active: 'active',
  success: 'success',
  error: 'error'
};
export class AbstractLoading implements OnDestroy {
  action: string | { type: string };
  subscription = new Subject();
  // tslint:disable-next-line: no-input-rename
  @Input('ngxsSuccessUrl')
  successUrl: string;

  // tslint:disable-next-line: no-output-on-prefix
  @Output('ngxsOnSuccess')
  // tslint:disable-next-line: no-output-rename
  onSuccessAction = new EventEmitter();

  // tslint:disable-next-line: no-output-on-prefix
  @Output('ngxsOnError')
  // tslint:disable-next-line: no-output-rename
  onErrorAction = new EventEmitter();

  // tslint:disable-next-line: no-output-on-prefix
  @Output('ngxsOnDispatch')
  // tslint:disable-next-line: no-output-rename
  onDispatch = new EventEmitter();

  constructor(protected elem: ElementRef, protected action$: Actions, protected router: Router) { }

  get nativeElement(): HTMLInputElement {
    return this.elem.nativeElement;
  }

  onEnable() {
    this.nativeElement.disabled = false;
  }

  onDisabled() {
    this.nativeElement.disabled = true;
  }

  onActive() {
    const { active, success, error } = CSS_CLASS_NAMES;
    this.nativeElement.classList.add(active);
    this.nativeElement.classList.remove(success, error);
  }

  onSuccess() {
    const { active, success, error } = CSS_CLASS_NAMES;
    this.nativeElement.classList.add(success);
    this.nativeElement.classList.remove(active, error);
  }

  onError() {
    const { active, success, error } = CSS_CLASS_NAMES;
    this.nativeElement.classList.add(error);
    this.nativeElement.classList.remove(active, success);
  }

  onRemoveActive() {
    this.nativeElement.classList.remove(CSS_CLASS_NAMES.active);
  }

  onRemoveSuccess() {
    this.nativeElement.classList.remove(CSS_CLASS_NAMES.success);
  }

  onRemoveError() {
    this.nativeElement.classList.remove(CSS_CLASS_NAMES.error);
  }

  watchAction() {
    this.action$
      .pipe(
        ofActionDispatched(this.getActionObject()),
        takeUntil(this.subscription)
      )
      .subscribe(() => {
        this.onActive();
        this.onDisabled();
        this.onDispatch.emit();
      });
    this.action$
      .pipe(
        ofActionSuccessful(this.getActionObject()),
        takeUntil(this.subscription)
      )
      .subscribe(() => {
        this.onSuccess();
        this.onEnable();
        this.navigateByUrl();
        this.onSuccessAction.emit();
      });
    this.action$
      .pipe(
        ofActionErrored(this.getActionObject()),
        takeUntil(this.subscription)
      )
      .subscribe(() => {
        this.onError();
        this.onEnable();
        this.onErrorAction.emit();
      });
  }
  getActionObject(): { type: string } {
    if (typeof this.action === 'string') {
      return { type: this.action };
    } else if (typeof this.action === 'object') {
      return this.action;
    }
    return this.action;
  }
  navigateByUrl() {
    if (typeof this.successUrl === 'string') {
      this.router.navigateByUrl(this.successUrl);
    }
  }
  ngOnDestroy(): void {
    this.subscription.next();
    this.subscription.complete();
  }
}
