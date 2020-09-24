import { State, Action, StateContext, Selector } from '@ngxs/store';
import { FetchingTeachersAction, FetchingBooksAction, CheckForEligibility, AddStudentForm } from './loading.actions';
import { of, Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { Student, IStudent } from '../data';
class LoadingStateModel {
  loadingBooks = false;
  loadingTeacher = false;
  studentList: IStudent[] = Student;
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

  @Action(CheckForEligibility)
  toggleApprovelById(ctx: StateContext<LoadingStateModel>, { id }: CheckForEligibility) {
    return new Observable((observer) => {
      setTimeout(() => {
        const { studentList } = ctx.getState();
        const student = studentList.find((item) => {
          return item.id === id;
        });
        if (student.marks >= 50) {
          observer.next(true);
          observer.complete();
        } else {
          observer.error('Student is not Eligibile')
        }
      }, 3000);

    });
  }

  @Action(AddStudentForm)
  addStudent(ctx: StateContext<LoadingStateModel>, { name }: AddStudentForm) {
    const students = ctx.getState().studentList;
    return new Observable((observer) => {
      setTimeout(() => {
        const isExist = students.find((st) => st.name.toLowerCase() === (name as string).toLowerCase());
        if (isExist) {
          observer.error('Student already exsit with this name');
          return;
        }
        const newRecord = {
          name,
          id: students.length + 1,
          marks: 60,
        }
        ctx.patchState({
          studentList: [...students, newRecord]
        });
        observer.next(newRecord);
        observer.complete();
      }, 2000);
    });
  }
}
