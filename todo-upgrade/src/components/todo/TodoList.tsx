import TodoCard from "./card/TodoCard";
import styled from "styled-components";
import { Todo } from "@/types/todo";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { initTodo } from "@/store/todo/action";
import { loadTodo } from "../utils/localStorage";

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
`;

const TodoList = () => {
  // useSelector로 todoReducer의 state를 가져와서 사용
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initTodo(loadTodo()));
  }, [dispatch]);
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
