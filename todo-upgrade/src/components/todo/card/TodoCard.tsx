import { ThemeContext } from "@/providers/ThemeProvider";
import { completeTodo, deleteTodo, updateTodo } from "@/store/action";
import THEME from "@/styles/theme";
import { Todo } from "@/types/todo";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import TodoMainContent from "./TodoMainContent";

const CardContainer = styled.div<{ theme: string }>`
  max-width: 80vh;
  width: 100%;
  display: flex;
  flex: 1, 1;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) =>
    theme === "LIGHT" ? THEME.COLOR.LIGHT.TODO_CARD : THEME.COLOR.DARK.TODO_CARD};
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid
    ${({ theme }) => (theme === "LIGHT" ? THEME.COLOR.LIGHT.PRIMARY : THEME.COLOR.DARK.PRIMARY)};
`;

const CardRightContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const CardButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
`;

const CardButton = styled.button<{ theme: string }>`
  display: inline-flex;
  align-items: center;
  margin: 0 2px;
  height: 18px;
  border-radius: 10px;
  border: none;
  padding: 10px 20px;
  font-size: 0.8rem;
  cursor: pointer;
  color: ${({ theme }) =>
    theme === "LIGHT" ? THEME.COLOR.DARK.BACKGROUND : THEME.COLOR.LIGHT.BACKGROUND};
`;

const EditButton = styled(CardButton)`
  background-color: ${({ theme }) =>
    theme === "LIGHT" ? THEME.COLOR.LIGHT.SECONDARY : THEME.COLOR.DARK.SECONDARY};
`;

const EditCompleteButton = styled(CardButton)`
  background-color: ${({ theme }) =>
    theme === "LIGHT" ? THEME.COLOR.LIGHT.PRIMARY : THEME.COLOR.DARK.PRIMARY};
`;

const DeleteButton = styled(CardButton)`
  background-color: ${({ theme }) =>
    theme === "LIGHT" ? THEME.COLOR.LIGHT.WARNING : THEME.COLOR.DARK.WARNING};
`;

const TodoContent = styled.span<{ theme?: string }>`
  color: ${({ theme }) =>
    theme === "LIGHT" ? THEME.COLOR.DARK.BACKGROUND : THEME.COLOR.LIGHT.BACKGROUND};
`;

const TodoCard = ({ data }: { data: Todo }) => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleEdit = () => {
    dispatch(updateTodo(data.id, data));
    setIsEdit(!isEdit);
  };

  const handleDelete = () => {
    dispatch(deleteTodo(data.id));
  };

  const handleComplete = () => {
    dispatch(completeTodo(data.id));
  };
  return (
    <>
      <CardContainer theme={theme}>
        <TodoMainContent
          theme={theme}
          data={data}
          handleComplete={handleComplete}
          isEdit={isEdit}
        ></TodoMainContent>
        <CardRightContent>
          <CardButtonContent>
            {isEdit ? (
              <EditCompleteButton theme={theme} onClick={handleEdit}>
                완료
              </EditCompleteButton>
            ) : (
              <EditButton theme={theme} onClick={toggleEdit}>
                수정
              </EditButton>
            )}
            <DeleteButton theme={theme} onClick={handleDelete}>
              삭제
            </DeleteButton>
          </CardButtonContent>
          <TodoContent theme={theme}>작성일: {data.createdAt}</TodoContent>
        </CardRightContent>
      </CardContainer>
    </>
  );
};

export default TodoCard;
