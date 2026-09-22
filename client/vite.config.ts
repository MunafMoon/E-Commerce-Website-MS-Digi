import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/E-Commerce-Website-MS-Digi/",
  plugins: [react()],
  server: { port: 5173 }
});
