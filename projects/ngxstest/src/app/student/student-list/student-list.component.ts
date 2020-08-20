import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FetchingTeachersAction, FetchingBooksAction } from '../../loading/loading.actions';
import { tap, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  fechingBookAction = new FetchingBooksAction();
  fetchingTeacherAction = new FetchingTeachersAction();
  constructor(private store: Store) { }

  ngOnInit() { }

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

}
