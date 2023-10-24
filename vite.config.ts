import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


// Define a list of aliases for path mappings.
const aliases = ["pages", "components", "utils", "router", "services", "types"];


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
      alias: aliases.map((alias) => ({
        find: `@/${alias}`,
        replacement: path.resolve(__dirname, `src/${alias}`),
      })),
    },
});
