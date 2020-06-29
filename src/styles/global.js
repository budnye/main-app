import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    min-height:100%;
  }

  body {
    background: linear-gradient(180deg, rgba(89,89,178,1) 0%, rgba(147,147,242,1) 75%, rgba(147,147,242,1.2)100%);
    -webkit-font-smoothing: antialiased !important;
  }

  body, button, table {
    color: #5959b2;
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
  }
  button {
    cursor: pointer;
  }
`;
