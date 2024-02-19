import { createGlobalStyle } from "styled-components";

const BoxSizing = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
`;

export default BoxSizing;
