import React from "react";
import styled from "styled-components";
import TodoInput from "./TodoInput";
import TodoRegisterBtn from "./TodoRegisterBtn";

const InputSection = styled.section`
    display: flex;
    flex: 1, 1;
    justify-content: center;
    align-items: center;
    background-color: green;
`;

const TodoInputContainer: React.FC = () => {
  return (
    <>
      <InputSection>
        <TodoInput></TodoInput>
        <TodoRegisterBtn></TodoRegisterBtn>
      </InputSection>
    </>
  );
};

export default TodoInputContainer;
