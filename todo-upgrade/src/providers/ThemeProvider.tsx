import { ReactNode, createContext, useState } from "react";

export type ThemeMode = "LIGHT" | "DARK";

interface ThemeCxt {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

export const ThemeContext = createContext<ThemeCxt>({
  theme: "LIGHT",
  setTheme: () => {},
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // TODO: Caching in localStorage
  const [theme, setTheme] = useState<ThemeMode>("LIGHT");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;