import Header from "@/components/layout/main/Header";
import TodoMainLayout from "@/components/layout/main/TodoMainLayout";
import ThemeProvider from "@/providers/ThemeProvider.tsx";
import GlobalStyle from "./styles/global";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <GlobalStyle />
        <Header />
        <TodoMainLayout></TodoMainLayout>
      </ThemeProvider>
    </>
  );
};

export default App;
