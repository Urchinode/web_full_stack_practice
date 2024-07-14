const COLOR = {
  LIGHT: {
    PRIMARY: "#42B693",
    SECONDARY: "#42ABB6",
    BACKGROUND: "#FAFAFA",
    TODO_CARD: "#FFFFFF",
    WARNING: "#FF7B7B",
  },
  DARK: {
    PRIMARY: "#14372C",
    SECONDARY: "#143337",
    BACKGROUND: "#000000",
    TODO_CARD: "#353737",
    WARNING: "#552929",
  },
};

const THEME = {
  COLOR,
};

export type Theme = typeof THEME;
export default THEME;
