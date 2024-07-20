import ThemeProvider from "@/providers/ThemeProvider.tsx";
import GlobalStyle from "./styles/global";
import { Provider } from "react-redux";
import store from "@/store/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "@/components/pages/LoginPage";
import TodoPage from "./components/pages/TodoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/todo",
    element: <TodoPage />,
  },
]);

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Provider store={store}>
          <GlobalStyle />
          <RouterProvider router={router}></RouterProvider>
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default App;
