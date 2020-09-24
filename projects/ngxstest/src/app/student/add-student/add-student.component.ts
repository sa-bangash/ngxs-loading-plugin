import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddStudentForm } from '../../loading/loading.actions';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    console.log(this.form)
  }

  throwError() {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.error('some thing is going wrong')
      }, 2000);
    }).pipe(catchError(
      (er) => {
        this.form.get('name').setErrors({ serverErr: 'some thig going wrong' });
        return throwError(er);
      }
    ));
  }
  onSubmit() {
    const { name } = this.form.value;
    return this.store.dispatch(new AddStudentForm(name)).pipe(tap(() => {
      this.router.navigate(['student']);
    }));
  }
}
