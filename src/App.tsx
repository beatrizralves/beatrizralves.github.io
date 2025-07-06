import React from "react";
import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { ThemeProvider } from "./Context/useThemeContext";
import { HeroSection } from "./components/HeroSection";
import { DbProvider } from "./Context/useDbContext";

function App() {
  return (
    <DbProvider>
      <ThemeProvider>
        <HashRouter>
          {/* to work in ghpages */}
          <Routes>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </DbProvider>
  );
}

export default App;
