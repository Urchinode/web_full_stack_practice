import styled from "styled-components";
import {  useDispatch, useSelector } from "react-redux";
import TodoInput from "./TodoInput";
import TodoRegisterBtn from "./TodoRegisterBtn";
import { useState } from "react";
import { RootState } from "@/store";
import { addTodo } from "@/store/action";

const InputSection = styled.form`
  display: flex;
  flex: 1, 1;
  justify-content: space-evenly;
  align-items: center;
`;

const TodoInputContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TodoInputContainer = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(title === "" || description === ""){
      alert("제목과 내용을 입력해주세요");
      return;
    }
    dispatch(addTodo({
      id: String(todos.length + 1),
      title: title,
      content: description,
      isDone: false,
      createdAt: new Date().toLocaleDateString(),
    }))
    setTitle("");
    setDescription("");
  }

  return (
    <>
      <InputSection onSubmit={handleSubmit}>
        <TodoInputContent>
          <TodoInput title={"제목"} placeholder="오늘은 무엇을 할건가요?" value={title} onChange={handleTitle}></TodoInput>
          <TodoInput title={"내용"} placeholder="할 일을 구체적으로 적어주세요" value={description} onChange={handleDescription}></TodoInput>
        </TodoInputContent>
        <TodoRegisterBtn></TodoRegisterBtn>
      </InputSection>
    </>
  );
};

export default TodoInputContainer;
