import { Component, OnInit } from '@angular/core';
import { FetchingBooksAction, FetchingTeachersAction } from '../loading.actions';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  fechingBookAction = new FetchingBooksAction();
  fetchingTeacherAction = new FetchingTeachersAction();
  constructor(private store: Store) { }

  ngOnInit() { }

  emptyObservableEmiting() {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.complete();
      }, 2000);
    });
  }
  fetchingBooks(): Observable<any> {
    return this.store.dispatch(this.fechingBookAction).pipe(tap((resp) => {
      /* here your code on success */
    }), catchError((error) => {
      /* here your code on error */
      return error;
    }));
  }

  fetchingTeachers(): Observable<any> {
    return this.store.dispatch(this.fetchingTeacherAction).pipe(tap((resp) => {
      /* here your code on success */
    }), catchError((error) => {
      /* here your code on error */
      throw error;
    }));
  }
  onSuccess() {
    console.log('onSuccess in component');
  }

  onDispatch() {
    console.log('onDispatch in component');
  }

  onError() {
    console.log('onError in component');
  }
}
