export class FetchingBooksAction {
  static readonly type = '[loading] fetching Books';
}

export class FetchingTeachersAction {
  static readonly type = '[loading] fetcing teachers';
}

export class ToggleApprovelById {
  static readonly type = '[loading] Toggle Approvel by id';
  constructor(public id: number) { }
}
