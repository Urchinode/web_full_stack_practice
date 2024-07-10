import * as React from "react";

interface TodoInputProps {}

const TodoInput: React.FC<TodoInputProps> = () => {
  return (
    <>
      <input type="text" placeholder="할 일을 입력하세요"></input>
    </>
  );
};

export default TodoInput;
