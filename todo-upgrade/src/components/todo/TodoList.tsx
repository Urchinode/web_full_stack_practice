import TodoCard from "./card/TodoCard";
import styled from "styled-components";
import { Todo } from "@/types/todo";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const TodoListContainer = styled.ul`
  padding: 0;
  margin: 0;
`;

const TodoListItem = styled.li`
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const TodoList = () => {
  // useSelector로 todoReducer의 state를 가져와서 사용
  const todos = useSelector((state: RootState) => state.todos);
  return (
    <>
      <TodoListContainer>
        {todos.map((todo: Todo, index: number) => (
          <TodoListItem key={index}>
            <TodoCard data={todo}></TodoCard>
          </TodoListItem>
        ))}
      </TodoListContainer>
    </>
  );
};

export default TodoList;
