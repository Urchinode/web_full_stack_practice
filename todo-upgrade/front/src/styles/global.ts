import { createGlobalStyle } from "styled-components";
import THEME from "./theme";
import GoormSans from "@/assets/fonts/goorm-sans-regular.woff2";

const GlobalStyle = createGlobalStyle`
    @font-face {
        font-family: 'goorm-sans';
        src: url(${GoormSans}) format('woff2');
        /* font-family: 'PartialSansKR'; */
        /* src: url('../assets/fonts/PartialSansKR-Regular.otf') format('opentype'); */
    }
    /* @font-face { */
        /* font-family: 'otfFont'; */
        /* src: url() format('opentype'); */
    /* } */
    .light{
        background-color: ${THEME.COLOR.LIGHT.BACKGROUND};
    }
    .dark{
        background-color: ${THEME.COLOR.DARK.BACKGROUND};
    }
    html{
        height: 100%;
        width: 100%;
        font-family: 'goorm-sans';
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
