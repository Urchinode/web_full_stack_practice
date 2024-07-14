import Header from "@/components/layout/main/Header";
import TodoMainLayout from "@/components/layout/main/TodoMainLayout";
import ThemeProvider from "@/providers/ThemeProvider.tsx";
import GlobalStyle from "./styles/global";
import { Provider } from "react-redux";
import store from "@/store/store";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Provider store={store}>
          <GlobalStyle />
          <Header />
          <TodoMainLayout></TodoMainLayout>
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
