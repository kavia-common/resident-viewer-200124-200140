import React, { useEffect, useState } from "react";
import "./App.css";
import OpenedBook from "./components/OpenedBook";
import { mockResidents } from "./data/residents";

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState("light");

  // Session-only persistence (survives internal navigation; resets on full refresh).
  const [cleanView, setCleanView] = useState(() => {
    try {
      return window.sessionStorage.getItem("cleanView") === "true";
    } catch {
      return false;
    }
  });

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Effect to expose clean view state to CSS as a global attribute.
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-clean-view",
      cleanView ? "true" : "false"
    );

    try {
      window.sessionStorage.setItem("cleanView", String(cleanView));
    } catch {
      // ignore (sessionStorage can be blocked in some environments)
    }
  }, [cleanView]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // PUBLIC_INTERFACE
  const toggleCleanView = () => {
    setCleanView((prev) => !prev);
  };

  return (
    <div className="App">
      <div className="appToggles" aria-label="Display options">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        <button
          className="clean-toggle"
          onClick={toggleCleanView}
          aria-pressed={cleanView}
          aria-label={`${cleanView ? "Disable" : "Enable"} clean view`}
          title="Clean View removes textures and extra effects."
        >
          {cleanView ? "Clean View: On" : "Clean View: Off"}
        </button>
      </div>

      <OpenedBook residents={mockResidents} />
    </div>
  );
}

export default App;
