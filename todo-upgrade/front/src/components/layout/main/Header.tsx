import styled from "styled-components";
import ThemeButton from "@/components/utils/ThemeButton";
import { useContext } from "react";
import { ThemeContext } from "@/providers/ThemeProvider";
import THEME from "@/styles/theme";

const HeaderContainer = styled.div<{ theme: string }>`
  display: flex;
  flex: 1 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) =>
    theme === "LIGHT" ? THEME.COLOR.LIGHT.BACKGROUND : THEME.COLOR.DARK.BACKGROUND};
`;

const HeaderTitle = styled.h1<{ theme: string }>`
  margin-left: 5px;
  color: ${({ theme }) =>
    theme === "LIGHT" ? THEME.COLOR.DARK.BACKGROUND : THEME.COLOR.LIGHT.BACKGROUND};
`;

const Header = () => {
  const { theme } = useContext(ThemeContext);

  const onLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        window.location.href = "/";
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <header>
        <HeaderContainer theme={theme}>
          <HeaderTitle theme={theme}>Manage your todo</HeaderTitle>
          <button onClick={onLogout}>로그아웃</button>
          <ThemeButton></ThemeButton>
        </HeaderContainer>
      </header>
    </>
  );
};

export default Header;
