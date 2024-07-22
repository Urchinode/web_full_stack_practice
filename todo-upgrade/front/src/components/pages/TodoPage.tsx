import Header from "@/components/layout/main/Header";
import TodoMainLayout from "@/components/layout/main/TodoMainLayout";
import { useEffect } from "react";

const TodoPage = () => {
  useEffect(() => {
    fetch("http://localhost:8080/todo", {
      method: "GET",
      credentials: "include",
    }).catch((e) => {
      console.log(e.message);
      // window.location.href = "/";
    });
  }, []);
  return (
    <>
      <Header />
      <TodoMainLayout></TodoMainLayout>
    </>
  );
};

export default TodoPage;
