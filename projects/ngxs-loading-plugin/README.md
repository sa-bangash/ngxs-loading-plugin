# NGXS loading Plugin


<p align="center">
  <a href="https://twitter.com/__bangash"><img src="https://img.shields.io/twitter/follow/__bangash.svg?label=Follow"/></a>
</p>

The plugin is created for adding action (dispatch, complete, error) status to UI elements such as the submit button [NGXS](https://www.npmjs.com/package/@ngxs/store).


## Reasons to Use This Plugin

 Most of the time we are importing so many things to show loader, disable the Ui element and  like the common one is creating a boolean state in component 
to check for action status, due to this plugin, we can easily handle by using [angular custom directive](https://angular.io/guide/attribute-directives), we can do the following things:

- watch action.
- watch state(like creating a boolean flag in-state).
- can directly dispatch and watch the action.

>We adding `CSS` class to the UI element to define the status of the action.
 * on action dispatch we adding `active` class.
 * on action success we adding `success` class.
 * on action throw error we adding `error` class.

### Disable the UI element.
when action is dispatch the UI element is disabled so plugin prevents a double click on the UI element and enables once action status becomes success or error..

 ***Note***: you need to adding CSS against these classes.

## Installation

Run the following code in your terminal:

```
yarn add ngxs-loading-plugin
```

or if you are using npm:

```
npm install ngxs-loading-plugin
```

## Usage

### Setup Before Initial Use

Import `NgxsLoadingPluginModule` into your root module like:

```TS
import { NgxsModule } from '@ngxs/store';
import { NgxsLoadingPluginModule } from 'ngxs-loading-plugin';

@NgModule({
  imports: [
    NgxsModule.forRoot([ /* Your states here */ ]),
    NgxsLoadingPluginModule.forRoot()
  ]
})
export class AppModule {}
```
>  we can pass config object to `forRoot` to change css class name.
```TS
  NgxsLoadingPluginModule.forRoot({
    cssClassName: {
      active: 'dispatch',
      success: 'done',
      error: 'error'
    }
  })
```
loading.actions.ts
```TS
export class FetchingBooksAction {
  static readonly type = 'FetchingBooksAction.type';
}

export class FetchingTeachersAction {
  static readonly type = 'FetchingTeachersAction.type';
}
```

loading.component.ts
```TS
@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  fechingBookAction = new FetchingBooksAction(); 
  fetchingTeacherAction = new FetchingTeachersAction();
  constructor(private store: Store) {}

  ngOnInit() {}

  fetchingBooks() {
    this.store.dispatch(this.fechingBookAction);
  }

  fetchingTeachers() {
    this.store.dispatch(this.fetchingTeacherAction);
  }
}
```

### Watch state.

using `ngxsStateWatchLoading` directive and pass the path as string.

```html
<button type="button" ngxsStateWatchLoading="loading.loadingBooks" (click)="fetchingBooks()">Submit</button>
```

> **Important Note**: here we just adding two CSS class `active` ( when the state becomes true) and `success` (when the state becomes false) because of boolean nature. we will try to move it to three states like 
* 0  => `active`.
* 1  => `success`.
* -1 => `error`.


### Watch the action

Passing the instance or class reference of action to `[ngxsActionWatchLoading]` directive.
```html
<button type="button" [ngxsActionWatchLoading]="fechingBookAction" (click)="fetchingBooks()">Submit</button>
```
or passing action type as a string `ngxsActionWatchLoading="FetchingBooksAction.type"`.
```html
<button type="button" ngxsActionWatchLoading="FetchingBooksAction.type" (click)="fetchingBooks()">Submit</button>
```

### Watch and dispatch the action.

Passing instance of action `[ngxsDispatchLoading]="fetchingTeacherAction"`.
```html
<button type="button [ngxsDispatchLoading]="fetchingTeacherAction">Submit</button>

```
or passing action as the string `ngxsStateWatchLoading="loading.loadingTeacher"`

```html
<button type="button" ngxsStateWatchLoading="loading.loadingTeacher" (click)="fetchingTeachers()">Submit</button>
```
### Call client function.
In `call function` we passing a function to the directive. the function should return observable. you can see the following example.

loading.component.ts
```TS
export class LoadingComponent {
  constructor(private store: Store) {}

  fetchingBooks(): Observable<any> {
    return this.store.dispatch(new FetchingBooksAction()).pipe(tap((resp) => {
      /* here your code on success */
    }), catchError((error) => {
      /* here your code on error */
      return error;
    }));
  }

  fetchingTeachers(): Observable<any> {
    return this.store.dispatch(new FetchingTeachersAction()).pipe(tap((resp) => {
      /* here your code on success */
    }), catchError((error) => {
      /* here your code on error */
      throw error;
    }));
  }
}
```
 here `fetchingBooks` and `fetchingTeachers` returning obserable and than we pass these function to directive in the current class context.

 ```html
<button type="button" [ngxsFunctionLoading]="fetchingBooks.bind(this)">Submit</button>
```
here 'bind' reserve the context of the current class. and send copy of function to the directive.

### Navigate by url once action is success

> Most of the time when action succeeded we need to redirect to
  another page, for this purpose you can use  `ngxsSuccessUrl` by passing url.

```html
<button type="button" [ngxsDispatchLoading]="fechingBookAction" ngxsSuccessUrl="home">Submit</button>
```
### Output on Success, Error and Dispatch actions.
If you want to do some thing, when action is dispatch, successed and on Error. following outputs from directive.
* ngxsOnDispatch
* ngxsOnSuccess
* ngxsOnError

#### ngxsOnDispatch
```HTML
<button [ngxsDispatchLoading]="fetchingTeacherAction" (ngxsOnDispatch)="onDispatch()">Submit</button>
```

#### ngxsOnSuccess
```HTML
<button [ngxsDispatchLoading]="fetchingTeacherAction" (ngxsOnSuccess)="onSuccess()">Submit</button>
```

#### ngxsOnError
```HTML
<button [ngxsDispatchLoading]="fetchingTeacherAction" (ngxsOnError)="onError()">Submit</button>
```

### License and copy right
&copy; Shahid Ahmad

License under the [MIT License](LICENSE).
