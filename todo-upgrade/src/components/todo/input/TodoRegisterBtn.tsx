import * as React from "react";
import styled from "styled-components";

const RegisterBtn = styled.button`
    height: 32px;
    border-radius: 10px;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
`

const TodoRegisterBtn: React.FC = () => {
  return (
    <>
      <RegisterBtn>Add</RegisterBtn>
    </>
  );
};

export default TodoRegisterBtn;
