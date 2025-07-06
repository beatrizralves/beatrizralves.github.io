import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  themeLocalStorageName,
  ThemeTypeEnum,
  useThemeContextValue,
} from "../Context/useThemeContext";
import "./ThemeToggle.css";
import { Button, Overlay, Tooltip } from "react-bootstrap";
export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { theme, setTheme } = useThemeContextValue();
  const [showTooltip, setShowTooltip] = useState(false);
  const target = useRef(null);
  function getThemeTypeStoredInLocalStorage(): ThemeTypeEnum {
    if (
      localStorage.getItem(themeLocalStorageName) ===
      ThemeTypeEnum.dark.toString()
    ) {
      return ThemeTypeEnum.dark;
    } else {
      return ThemeTypeEnum.light;
    }
  }

  useEffect(() => {
    const storedTheme = getThemeTypeStoredInLocalStorage();
    if (storedTheme === ThemeTypeEnum.dark) {
      setIsDarkMode(true);
      document.documentElement.classList.add(ThemeTypeEnum.dark);
    } else {
      localStorage.setItem(
        themeLocalStorageName,
        ThemeTypeEnum.light.toString()
      );
      setTheme(ThemeTypeEnum.light);
      setIsDarkMode(false);
    }
  }, [setTheme]);

  const toggleTheme = () => {
    handleClick();
    if (isDarkMode) {
      document.documentElement.classList.remove(ThemeTypeEnum.dark);
      localStorage.setItem(themeLocalStorageName, ThemeTypeEnum.light);
      setTheme(ThemeTypeEnum.light);
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add(ThemeTypeEnum.dark);
      localStorage.setItem(themeLocalStorageName, ThemeTypeEnum.dark);
      setTheme(ThemeTypeEnum.dark);
      setIsDarkMode(true);
    }
  };

  const iconStyle: React.CSSProperties = {
    width: "24px",
    height: "24px",
    color: isDarkMode ? "#facc15" : "#1e3a8a", // yellow-400 or blue-900
  };

  const responsiveStyle: React.CSSProperties = {
    display: "block",
  };
  const handleClick = () => {
    setShowTooltip(false);
    // Do your click action here
    console.log("Component clicked");
  };
  useEffect(() => {
    // Show the tooltip automatically on page load
    const timer = setTimeout(() => setShowTooltip(true), 500); // optional delay
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <Button
        ref={target}
        onClick={toggleTheme}
        className="toggle_button"
        style={{
          backgroundColor:
            theme === ThemeTypeEnum.dark
              ? "#3d3d3dd6"
              : "var(--bs-secondary-bg)",
          ...responsiveStyle,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "#d1d5db";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor =
            "var(--bs-secondary-bg)";
        }}
      >
        {isDarkMode ? <Sun style={iconStyle} /> : <Moon style={iconStyle} />}
      </Button>
      <Overlay target={target.current} show={showTooltip} placement="bottom">
        {(props) => (
          <Tooltip id="tooltip-autoshow" {...props}>
            Click here to <br></br>change theme
          </Tooltip>
        )}
      </Overlay>
    </>
  );
};
