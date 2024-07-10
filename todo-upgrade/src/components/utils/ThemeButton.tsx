import LightIcon from "@/assets/icons/light.svg?react";
import NightIcon from "@/assets/icons/night.svg?react";
import styled from "styled-components";

const ThemeButtonContainer = styled.button`
  margin-left: auto;
  margin-right: 4px;
  padding: 4px;
  border-radius: 10px;
  background-color: white;
  border: none;
`;

const ThemeButton = () => {
  return (
    <>
      <ThemeButtonContainer>
        {/* <LightIcon></LightIcon> */}
        <NightIcon></NightIcon>
      </ThemeButtonContainer>
    </>
  );
};

export default ThemeButton;
