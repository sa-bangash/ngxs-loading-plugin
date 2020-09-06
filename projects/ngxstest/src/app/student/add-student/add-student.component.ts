import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddStudentForm } from '../../loading/loading.actions';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  form: FormGroup;
  constructor(private fb: FormBuilder, private store: Store, private router: Router) {
    this.form = this.fb.group({
      name: [],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const { name } = this.form.value;
    return this.store.dispatch(new AddStudentForm(name)).pipe(tap(() => {
      this.router.navigate(['student']);
    }));
  }
}
