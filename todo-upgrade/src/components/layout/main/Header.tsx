import styled from "styled-components";
import ThemeButton from "@/components/utils/ThemeButton";

const HeaderContainer = styled.div`
  display: flex;
  flex: 1 1;
  align-items: center;
  justify-content: center;
`;

const HeaderTitle = styled.span``;

const Header = () => {
  return (
    <>
      <header>
        <HeaderContainer>
          <HeaderTitle>
            <h1>Manage your todo</h1>
          </HeaderTitle>
          <ThemeButton></ThemeButton>
        </HeaderContainer>
      </header>
    </>
  );
};

export default Header;
