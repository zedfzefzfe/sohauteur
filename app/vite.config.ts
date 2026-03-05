import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ["gsap"],
          lenis: ["lenis"],
          swiper: ["swiper"],
        },
      },
    },
  },
  optimizeDeps: {
    include: ["gsap", "lenis", "swiper"],
  },
})