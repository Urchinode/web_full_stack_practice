import { loadTheme, saveTheme } from "@/components/utils/localStorage";
import { ReactNode, createContext, useEffect, useState } from "react";

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
  const [theme, setTheme] = useState<ThemeMode>(loadTheme());

  useEffect(() => {
    const root = document.getElementById("root");
    if (root) root.className = theme.toLowerCase();
    saveTheme(theme);
  });

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
