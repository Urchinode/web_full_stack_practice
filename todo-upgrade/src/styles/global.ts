import { createGlobalStyle } from "styled-components";
import THEME from "./theme";

const GlobalStyle = createGlobalStyle`
    .light{
        background-color: ${THEME.COLOR.LIGHT.BACKGROUND};
    }
    .dark{
        background-color: ${THEME.COLOR.DARK.BACKGROUND};
    }
    html{
        height: 100%;
        width: 100%;
        font-family: Inter, system-ui;
    }
    body{
        height: 100%;
        width: 100%;
        margin: 0;
    }
    #root {
        min-width: 370px;
        width: 100%;
        height: 100%;
    }
`;

export default GlobalStyle;