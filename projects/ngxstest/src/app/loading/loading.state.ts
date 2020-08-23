import { State, Action, StateContext, Selector } from '@ngxs/store';
import { FetchingTeachersAction, FetchingBooksAction, ToggleApprovelById } from './loading.actions';
import { of, Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { Student } from '../data';
class LoadingStateModel {
  loadingBooks = false;
  loadingTeacher = false;
  studentList = Student;
}
@State<LoadingStateModel>({
  name: 'loading',
  defaults: new LoadingStateModel()
})
export class LoadingState {

  @Selector()
  static studentList(state: LoadingStateModel) {
    return state.studentList;
  }

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

  @Action(ToggleApprovelById)
  toggleApprovelById(ctx: StateContext<LoadingStateModel>, { id }: ToggleApprovelById) {
    return Observable.create((observer) => {
      setTimeout(() => {
        const { studentList } = ctx.getState();
        const newList = studentList.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              approved: !item.approved,
            };
          }
          return item;
        });
        ctx.patchState({
          studentList: newList
        });
        observer.next(newList);
        observer.complete();
      }, 3000);

    });
  }

}
