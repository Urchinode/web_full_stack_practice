import React from "react";
import TodoList from "@/components/todo/TodoList";
import TodoInputContainer from "@/components/todo/input/TodoInputContainer";
import styled from "styled-components";

const MainLayout = styled.main`
  margin: 10px 5%;
`;

const TodoMainLayout: React.FC = () => {
  return (
    <>
      <MainLayout>
        <TodoInputContainer></TodoInputContainer>
        <TodoList></TodoList>
      </MainLayout>
    </>
  );
};

export default TodoMainLayout;
