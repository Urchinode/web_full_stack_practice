import styled from "styled-components";
import { useDispatch } from "react-redux";
import TodoInput from "./TodoInput";
import TodoRegisterBtn from "./TodoRegisterBtn";
import { useState } from "react";
import { addTodo } from "@/store/todo/action";

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
  const dispatch = useDispatch();

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") {
      alert("제목과 내용을 입력해주세요");
      return;
    }
    const todo = {
      id: new Date().toString(),
      title: title.trim(),
      content: description.trim(),
      isDone: false,
      createdAt: new Date().toLocaleDateString(),
    };
    dispatch(addTodo(todo));
    setTitle("");
    setDescription("");
  };

  return (
    <>
      <InputSection onSubmit={handleSubmit}>
        <TodoInputContent>
          <TodoInput
            title={"제목"}
            placeholder="오늘은 무엇을 할건가요?"
            value={title}
            onChange={handleTitle}
          ></TodoInput>
          <TodoInput
            title={"내용"}
            placeholder="할 일을 구체적으로 적어주세요"
            value={description}
            onChange={handleDescription}
          ></TodoInput>
        </TodoInputContent>
        <TodoRegisterBtn></TodoRegisterBtn>
      </InputSection>
    </>
  );
};

export default TodoInputContainer;
