import { saveTodo } from "@/components/utils/localStorage";
import { INIT_TODO, ADD_TODO, UPDATE_TODO, DELETE_TODO, COMPLETE_TODO, TodoAction } from "./action";
import { Todo } from "@/types/todo";

type TodoState = Todo[];

export const initialState: TodoState = [];

export const todoReducer = (state: TodoState = initialState, action: TodoAction) => {
  switch (action.type) {
    case INIT_TODO:
      return action.payload;
    case ADD_TODO:
      return saveTodo([...state, action.payload]);
    case UPDATE_TODO:
      return saveTodo(
        state.map((todo) => (todo.id === action.payload.id ? action.payload.todo : todo)),
      );
    case DELETE_TODO:
      return saveTodo(state.filter((todo) => todo.id !== action.payload));
    case COMPLETE_TODO:
      return saveTodo(
        state.map((todo) =>
          todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo,
        ),
      );
    default:
      return state;
  }
};

export default todoReducer;
