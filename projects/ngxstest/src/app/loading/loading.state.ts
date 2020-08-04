import { State, Action, StateContext } from '@ngxs/store';
import { FetchingTeachersAction, FetchingBooksAction } from './loading.actions';
import { of, Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
class LoadingStateModel {
  loadingBooks = false;
  loadingTeacher = false;
}
@State<LoadingStateModel>({
  name: 'loading',
  defaults: new LoadingStateModel()
})
export class LoadingState {
  @Action(FetchingBooksAction)
  public onBooksFetching({ patchState }: StateContext<LoadingStateModel>) {
    patchState({
      loadingBooks: true
    });
    return of([])
      .pipe(delay(2000))
      .pipe(
        finalize(() => {
          patchState({
            loadingBooks: false
          });
        })
      );
  }

  @Action(FetchingTeachersAction)
  public onTeacherFetching({ patchState }: StateContext<LoadingStateModel>) {
    patchState({
      loadingTeacher: true
    });
    return new Observable(obs => {
      setTimeout(() => {
        obs.error('some thing');
      }, 2000);
    }).pipe(
      finalize(() => {
        patchState({
          loadingTeacher: false
        });
      })
    );
  }
}
