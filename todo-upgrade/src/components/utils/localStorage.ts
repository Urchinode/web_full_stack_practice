import { ThemeMode } from "@/providers/ThemeProvider";
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

export const saveTodo = (todos: Todo[]): Todo[] => {
  window.localStorage.setItem("TODO", JSON.stringify(todos));
  return todos;
};

export const loadTheme = (): ThemeMode => {
  const theme: ThemeMode | null = window.localStorage.getItem("THEME") as ThemeMode | null;
  return theme ?? "LIGHT";
};

export const saveTheme = (theme: string): string => {
  window.localStorage.setItem("THEME", theme);
  return theme;
};
