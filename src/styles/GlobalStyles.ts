"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.charcoal};
    background-color: ${({ theme }) => theme.colors.white};
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    line-height: 1.15;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.navy};
  }

  h1 { font-size: ${({ theme }) => theme.fontSizes["6xl"]}; }
  h2 { font-size: ${({ theme }) => theme.fontSizes["5xl"]}; }
  h3 { font-size: ${({ theme }) => theme.fontSizes["4xl"]}; }
  h4 { font-size: ${({ theme }) => theme.fontSizes["3xl"]}; }
  h5 { font-size: ${({ theme }) => theme.fontSizes["2xl"]}; }
  h6 { font-size: ${({ theme }) => theme.fontSizes.xl}; }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    h1 { font-size: ${({ theme }) => theme.fontSizes["4xl"]}; }
    h2 { font-size: ${({ theme }) => theme.fontSizes["3xl"]}; }
    h3 { font-size: ${({ theme }) => theme.fontSizes["2xl"]}; }
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: 1.7;
    color: ${({ theme }) => theme.colors.grayDark};
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.base};
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ul, ol {
    list-style: none;
  }
`;
