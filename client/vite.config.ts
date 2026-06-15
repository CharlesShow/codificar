import { defineConfig } from "vite";
import "dotenv/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: Number(process.env["PORT"]),
    proxy: {
      "/api": {
        target: process.env["API_URL"],
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
