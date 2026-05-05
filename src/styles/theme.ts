export const theme = {
  colors: {
    // Brand
    primary: "#2745A8",
    primaryDark: "#1a3080",
    primaryLight: "#4a67c4",
    navy: "#0f1a3d",

    // Neutrals
    black: "#0a0a0a",
    charcoal: "#1a1a1a",
    grayDark: "#4a4a4a",
    gray: "#7a7a7a",
    grayLight: "#c4c4c4",
    grayLighter: "#e8e8e8",
    offWhite: "#f7f7f5",
    white: "#ffffff",

    // Accents
    gold: "#c9a961",
    success: "#2d8659",
    error: "#c44545",
  },

  fonts: {
    heading: "var(--font-heading), Georgia, serif",
    body: "var(--font-body), system-ui, sans-serif",
  },

  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "2rem",
    "4xl": "2.5rem",
    "5xl": "3.25rem",
    "6xl": "4rem",
    "7xl": "5rem",
  },

  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  spacing: {
    xs: "0.5rem",
    sm: "1rem",
    md: "1.5rem",
    lg: "2rem",
    xl: "3rem",
    "2xl": "4rem",
    "3xl": "6rem",
    "4xl": "8rem",
  },

  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "1280px",
    wide: "1536px",
  },

  maxWidth: "1280px",

  transitions: {
    fast: "150ms ease",
    base: "250ms ease",
    slow: "400ms ease",
  },

  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 4px 12px rgba(0, 0, 0, 0.08)",
    lg: "0 12px 32px rgba(0, 0, 0, 0.12)",
    xl: "0 24px 64px rgba(0, 0, 0, 0.16)",
  },
} as const;

export type Theme = typeof theme;
