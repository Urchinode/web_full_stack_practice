import React, { useState } from "react";
import TodoCard from "./card/TodoCard";
import styled from "styled-components";

const TodoListContainer = styled.ul`
  padding: 0;  
`;

const TodoListItem = styled.li`
    list-style: none;
`

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState([1, 2, 3, 4]);
  return (
    <>
      <TodoListContainer>
        {todos.map((todo: any, index: number) => (
          <TodoListItem key={index}>
            <TodoCard></TodoCard>
          </TodoListItem>
        ))}
      </TodoListContainer>
    </>
  );
};

export default TodoList;
