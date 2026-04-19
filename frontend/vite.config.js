// filename: vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Fix __dirname for ES modules
 *
 * Converts import.meta.url to a usable filesystem path
 * so we can safely use path.resolve.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Vite configuration
 *
 * - Adds alias '@' pointing to src
 * - Adds proxy to backend (localhost:3000)
 */
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },

  /**
   * Dev server configuration
   *
   * Proxies API requests to backend server.
   * This allows using "/api/..." in frontend
   * without hardcoding backend URL.
   */
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
});