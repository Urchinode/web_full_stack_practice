import THEME from "@/styles/theme";
import { Todo } from "@/types/todo";
import { useContext, useState } from "react";
import styled from "styled-components";
import TodoInput from "../input/TodoInput";
import { ThemeContext } from "@/providers/ThemeProvider";

const CardMainContent = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const CardCheckBoxContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardCompleteSpan = styled.span<{ theme: string }>`
  color: ${({ theme }) =>
    theme === "LIGHT" ? THEME.COLOR.DARK.SECONDARY : THEME.COLOR.LIGHT.SECONDARY};
  margin-left: 5px;
`;

const TodoTitle = styled.h3<{ theme?: string }>`
  color: ${({ theme }) =>
    theme === "LIGHT" ? THEME.COLOR.DARK.BACKGROUND : THEME.COLOR.LIGHT.BACKGROUND};
`;

const TodoContent = styled.span<{ theme?: string }>`
  color: ${({ theme }) =>
    theme === "LIGHT" ? THEME.COLOR.DARK.BACKGROUND : THEME.COLOR.LIGHT.BACKGROUND};
`;

interface TodoMainContentChildProps {
  theme: string;
  data: Todo;
  handleComplete: (id: string) => void;
}

interface TodoMainContentProps extends TodoMainContentChildProps {
  isEdit: boolean;
}

const TodoDefaultContent = ({ data, handleComplete, theme }: TodoMainContentChildProps) => {
  return (
    <CardMainContent>
      <CardCheckBoxContent>
        <label>
          <input
            type="checkbox"
            checked={data.isDone}
            onChange={() => handleComplete(data.id)}
            title="todo complete checkbox"
          />
        </label>
        <CardCompleteSpan theme={theme}>{data.isDone ? "완료!" : ""}</CardCompleteSpan>
      </CardCheckBoxContent>
      <TodoTitle theme={theme}>{data.title}</TodoTitle>
      <TodoContent theme={theme}>{data.content}</TodoContent>
    </CardMainContent>
  );
};

const TodoEditContent = ({ data }: { data: Todo }) => {
  const [title, setTitle] = useState<string>(data.title);
  const [content, setContent] = useState<string>(data.content);
  const { theme } = useContext(ThemeContext);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  return (
    <>
      <TodoInput
        title={"제목"}
        placeholder="제목 입력"
        value={title}
        onChange={handleTitle}
        $bgColor={theme === "LIGHT" ? THEME.COLOR.LIGHT.TODO_CARD : THEME.COLOR.DARK.TODO_CARD}
      ></TodoInput>
      <TodoInput
        title={"내용"}
        placeholder="내용 입력"
        value={content}
        onChange={handleContent}
        $bgColor={theme === "LIGHT" ? THEME.COLOR.LIGHT.TODO_CARD : THEME.COLOR.DARK.TODO_CARD}
      ></TodoInput>
    </>
  );
};

const TodoMainContent = ({ data, handleComplete, theme, isEdit }: TodoMainContentProps) => {
  return (
    <>
      <CardMainContent>
        {isEdit ? (
          <TodoEditContent data={data}></TodoEditContent>
        ) : (
          <TodoDefaultContent data={data} handleComplete={handleComplete} theme={theme} />
        )}
      </CardMainContent>
    </>
  );
};
export default TodoMainContent;
