import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configure the development server options.
  server: {
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
  // Configure path aliasing for easier imports.
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
