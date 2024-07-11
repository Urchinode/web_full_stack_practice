import React from "react";
import styled from "styled-components";
import TodoInput from "./TodoInput";
import TodoRegisterBtn from "./TodoRegisterBtn";

const InputSection = styled.section`
  display: flex;
  flex: 1, 1;
  justify-content: space-evenly;
  align-items: center;
`;

const TodoInputContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TodoInputContainer: React.FC = () => {
  return (
    <>
      <InputSection>
        <TodoInputContent>
          <TodoInput></TodoInput>
          <TodoInput></TodoInput>
        </TodoInputContent>
        <TodoRegisterBtn></TodoRegisterBtn>
      </InputSection>
    </>
  );
};

export default TodoInputContainer;
