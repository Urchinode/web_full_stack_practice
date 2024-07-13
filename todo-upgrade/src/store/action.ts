import { Todo } from "@/types/todo";

export const INIT_TODO = "INIT_TODO" as const;
export const ADD_TODO = "ADD_TODO" as const;
export const DELETE_TODO = "DELETE_TODO" as const;
export const UPDATE_TODO = "UPDATE_TODO" as const;
export const COMPLETE_TODO = "COMPLETE_TODO" as const;

export type TodoAction =
  | ReturnType<typeof initTodo>
  | ReturnType<typeof addTodo>
  | ReturnType<typeof deleteTodo>
  | ReturnType<typeof updateTodo>
  | ReturnType<typeof completeTodo>;

export const initTodo = (todo: Todo[]) => {
  return {
    type: INIT_TODO,
    payload: todo,
  };
};

export const addTodo = (todo: Todo) => {
  return {
    type: ADD_TODO,
    payload: todo,
  };
};

export const deleteTodo = (id: string) => {
  return {
    type: DELETE_TODO,
    payload: id,
  };
};

export const updateTodo = (id: string, todo: Todo) => {
  return {
    type: UPDATE_TODO,
    payload: { id, todo },
  };
};

export const completeTodo = (id: string) => {
  return {
    type: COMPLETE_TODO,
    payload: id,
  };
};
