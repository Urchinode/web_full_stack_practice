import { loadTodo, saveTodo } from "@/components/utils/localStorage";
import { type Todo } from "@/types/todo";

const dummyTodo: Todo[] = [
  {
    id: "1",
    title: "title",
    content: "content",
    isDone: false,
    createdAt: new Date().toLocaleDateString(),
  },
];

const newTodo = {
  id: "2",
  title: "title2",
  content: "content2",
  isDone: false,
  createdAt: new Date().toLocaleDateString(),
};

beforeEach(() => {
  localStorage.setItem("TODO", JSON.stringify(dummyTodo));
});

afterEach(() => {
  localStorage.setItem("TODO", JSON.stringify([]));
});

test("Load todo list from local storage", () => {
  const todos = loadTodo();
  expect(todos.length).toBe(1);
  expect(todos[0].id).toBe("1");
});

test("Save todo list to local storage", () => {
  saveTodo([...dummyTodo, newTodo]);
  const todos = loadTodo();
  expect(todos.length).toBe(2);
  expect(todos[1].id).toBe("2");
});
