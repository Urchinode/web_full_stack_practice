import { useState } from "react";
import TodoCard from "./card/TodoCard";
import styled from "styled-components";
import { Todo } from "@/types/todo";

const TodoListContainer = styled.ul`
  padding: 0;
`;

const TodoListItem = styled.li`
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: "할 일 1",
      content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi architecto repellat deserunt ratione. Quam quae quaerat suscipit rerum numquam, vel reprehenderit deleniti esse perferendis quas iste asperiores neque, officiis vero.",
      isDone: false,
      createdAt: new Date()
    },
    {
      id: 2,
      title: "할 일 2",
      content: "내용 2",
      isDone: false,
      createdAt: new Date()
    },
  ]);
  return (
    <>
      <TodoListContainer>
        {todos.map((todo: Todo, index: number) => (
          <TodoListItem key={index}>
            <TodoCard data={todo}></TodoCard>
          </TodoListItem>
        ))}
      </TodoListContainer>
    </>
  );
};

export default TodoList;
