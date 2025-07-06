import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export enum ThemeTypeEnum {
  dark = "dark",
  light = "light",
}

interface ThemeContextType {
  theme: ThemeTypeEnum;
  setTheme: React.Dispatch<React.SetStateAction<ThemeTypeEnum>>;
}
export const themeLocalStorageName = "theme";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const key = themeLocalStorageName;

  const [value, setValue] = useState<ThemeTypeEnum>(() => {
    const stored = localStorage.getItem(key);
    return stored === ThemeTypeEnum.dark
      ? ThemeTypeEnum.dark
      : ThemeTypeEnum.light;
  });

  // Sync theme changes to localStorage
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  return (
    <ThemeContext.Provider value={{ theme: value, setTheme: setValue }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContextValue() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContextValue must be used within a ThemeProvider");
  }
  return context;
}
