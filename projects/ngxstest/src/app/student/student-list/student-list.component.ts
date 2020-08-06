import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FetchingTeachersAction, FetchingBooksAction } from '../../loading/loading.actions';

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

  fetchingBooks() {
    this.store.dispatch(this.fechingBookAction);
  }

  fetchingTeachers() {
    this.store.dispatch(this.fetchingTeacherAction);
  }

}
