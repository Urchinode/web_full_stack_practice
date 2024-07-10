import "./App.css";
import Header from "@/components/layout/main/Header";
import TodoMainLayout from '@/components/layout/main/TodoMainLayout';
// import GlobalStyle from "./styles/global";

const App: React.FC = () => {
  return (
    <>
      {/* <GlobalStyle /> */}
      <Header />
      <TodoMainLayout></TodoMainLayout>
    </>
  );
};

export default App;
