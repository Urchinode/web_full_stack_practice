import LightIcon from "@/assets/icons/light.svg?react";
import NightIcon from "@/assets/icons/night.svg?react";
import { ThemeContext } from "@/providers/ThemeProvider";
import THEME from "@/styles/theme";
import { useContext } from "react";
import styled from "styled-components";

const ThemeButtonContainer = styled.button`
  margin-left: auto;
  margin-right: 4px;
  padding: 4px;
  border-radius: 10px;
  background-color: ${THEME.COLOR.LIGHT.BACKGROUND};
  border: none;
  cursor: pointer;
`;

const ThemeButton = () => {
  const {theme, setTheme} = useContext(ThemeContext);
  return (
    <>
      <ThemeButtonContainer>
        {theme === "LIGHT" ? <LightIcon onClick={() => setTheme("DARK")}/> : <NightIcon onClick={() => setTheme("LIGHT")}/>}
      </ThemeButtonContainer>
    </>
  );
};

export default ThemeButton;
