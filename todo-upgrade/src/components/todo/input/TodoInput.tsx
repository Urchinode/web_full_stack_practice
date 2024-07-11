import * as React from "react";
import styled from "styled-components";

interface TodoInputProps {}

const TodoInputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TodoInput: React.FC<TodoInputProps> = () => {
  return (
    <>
      <TodoInputBox>
        <span>이름</span>
        <input type="text" placeholder="할 일을 입력하세요"></input>
      </TodoInputBox>
    </>
  );
};

export default TodoInput;
