// filename: src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

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

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);