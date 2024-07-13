import { Todo } from "@/types/todo";

export const loadTodo = (): Todo[] => {
  const todos = window.localStorage.getItem("TODO");
  let result: Todo[] = [];
  try {
    result = JSON.parse(todos || "");
  } catch (e: unknown) {
    console.log((e as Error).message);
  }
  return result;
};

export const saveTodo = (todos: Todo[]) => {
  window.localStorage.setItem("TODO", JSON.stringify(todos));
};
