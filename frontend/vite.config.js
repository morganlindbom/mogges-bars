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
 * - Ensures Authorization headers are forwarded
 */
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@CreateRecipe": path.resolve(__dirname, "./src/components/CreateRecipe")
    }
  },

  /**
   * Dev server configuration
   *
   * Proxies API requests to backend server.
   * Ensures headers (especially Authorization) are preserved.
   */
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,

        /**
         * Forward Authorization header explicitly
         *
         * Some environments may drop headers without this.
         */
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            if (req.headers.authorization) {
              proxyReq.setHeader(
                "Authorization",
                req.headers.authorization
              );
            }
          });
        }
      }
    }
  }
});