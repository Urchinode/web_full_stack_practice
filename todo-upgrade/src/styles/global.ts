import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html{
        height: 100vh;
        font-family: Inter, system-ui;
        height: 100%;
    }
    #root {
        min-width: 370px;
        height: 100%;
    }
    body {
        margin: 0;
        height: 100%;
    }
`;

export default GlobalStyle;