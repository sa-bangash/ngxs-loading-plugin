import { Component, OnInit } from '@angular/core';
import { FetchingBooksAction, FetchingTeachersAction } from '../loading.actions';
import { Store } from '@ngxs/store';

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

  fetchingBooks() {
    this.store.dispatch(this.fechingBookAction);
  }

  fetchingTeachers() {
    this.store.dispatch(this.fetchingTeacherAction);
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
