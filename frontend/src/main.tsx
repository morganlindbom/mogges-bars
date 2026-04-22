// filename: src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";
import "./App.css";

/**
 * Application bootstrap.
 *
 * Mounts React app into DOM.
 */
const rootElement = document.getElementById("root");

/**
 * Ensure root element exists.
 *
 * TypeScript requires explicit null handling.
 */
if (!rootElement) {
  throw new Error("Root element not found");
}

/**
 * Create React root and render application.
 */
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);