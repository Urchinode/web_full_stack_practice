export interface TodoContent {
  title: string;
  content: string;
}

export interface Todo extends TodoContent {
  readonly id: string;
  isDone: boolean;
  createdAt: string;
}

export type TodoMetaData = Omit<Todo, "createdAt">;

// todo read, update 시 사용
export function toTodoMetaData(todo: Todo): TodoMetaData {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, ...metaData } = todo;
  return metaData;
}
