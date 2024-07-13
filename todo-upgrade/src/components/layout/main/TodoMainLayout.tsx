import { useContext } from "react";
import TodoList from "@/components/todo/TodoList";
import TodoInputContainer from "@/components/todo/input/TodoInputContainer";
import styled from "styled-components";
import { ThemeContext } from "@/providers/ThemeProvider";
import THEME from "@/styles/theme";

const MainLayout = styled.main<{ theme: string }>`
  padding: 10px 5%;
  background-color: ${({ theme }) =>
    theme === "LIGHT" ? THEME.COLOR.LIGHT.BACKGROUND : THEME.COLOR.DARK.BACKGROUND};
`;

const TodoMainLayout = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <MainLayout theme={theme}>
        <TodoInputContainer></TodoInputContainer>
        <TodoList></TodoList>
      </MainLayout>
    </>
  );
};

export default TodoMainLayout;
