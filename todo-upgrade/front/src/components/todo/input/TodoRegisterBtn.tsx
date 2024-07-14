import { ThemeContext } from "@/providers/ThemeProvider";
import THEME from "@/styles/theme";
import * as React from "react";
import styled from "styled-components";

const RegisterBtn = styled.button<{ theme: string }>`
  height: 32px;
  border-radius: 15px;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background-color: ${({ theme }) =>
    theme === "LIGHT" ? THEME.COLOR.LIGHT.PRIMARY : THEME.COLOR.DARK.PRIMARY};
  color: ${({ theme }) =>
    theme === "LIGHT" ? THEME.COLOR.DARK.BACKGROUND : THEME.COLOR.LIGHT.BACKGROUND};
`;

const TodoRegisterBtn: React.FC = () => {
  const { theme } = React.useContext(ThemeContext);
  return (
    <>
      <RegisterBtn theme={theme}>Add</RegisterBtn>
    </>
  );
};

export default TodoRegisterBtn;
