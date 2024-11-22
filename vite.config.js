import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@emotion/react", // Use Emotion's JSX runtime
      babel: {
        plugins: ["@emotion/babel-plugin"], // Enable Emotion Babel plugin
      },
    }),
  ],
});
