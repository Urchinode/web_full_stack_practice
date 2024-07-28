import Header from "@/components/layout/main/Header";
import TodoMainLayout from "@/components/layout/main/TodoMainLayout";
import { useEffect } from "react";

const TodoPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/todo", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.text();
          console.log(data);
        } else window.location.href = "/";
      } catch (e) {
        console.log(e);
        window.location.href = "/";
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Header />
      <TodoMainLayout></TodoMainLayout>
    </>
  );
};

export default TodoPage;
