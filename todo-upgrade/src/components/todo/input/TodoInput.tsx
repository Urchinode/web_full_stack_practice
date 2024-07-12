import { ThemeContext } from "@/providers/ThemeProvider";
import THEME from "@/styles/theme";
import { useContext } from "react";
import styled from "styled-components";

const TodoInputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;

const TodoInputName = styled.span<{ theme: string }>`
  color: ${({ theme }) =>
    theme === "LIGHT"
      ? THEME.COLOR.DARK.BACKGROUND
      : THEME.COLOR.LIGHT.BACKGROUND};
  margin-right: 5px;
`;

const Input = styled.input<{ theme: string }>`
  width: 200px;
  height: 30px;
  border: none;
  background-color: ${({ theme }) =>
    theme === "LIGHT"
      ? THEME.COLOR.LIGHT.BACKGROUND
      : THEME.COLOR.DARK.BACKGROUND};
`;

interface TodoInputProps {
  title: string;
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TodoInput = ({ title, placeholder, value, onChange }: TodoInputProps) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <TodoInputBox>
        <TodoInputName theme={theme}>{title}</TodoInputName>
        <Input
          theme={theme}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        ></Input>
      </TodoInputBox>
    </>
  );
};

export default TodoInput;
