export class FetchingBooksAction {
  static readonly type = '[loading] fetching Books';
}

export class FetchingTeachersAction {
  static readonly type = '[loading] fetcing teachers';
}

export class CheckForEligibility {
  static readonly type = '[loading] CheckForEligibility';
  constructor(public id: number) { }
}
export class AddStudentForm {
  static readonly type = '[loading] Add Student Form';
  constructor(public name: string) { }
}
