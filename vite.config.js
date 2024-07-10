import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react-swc";
import macrosPlugin from "vite-plugin-babel-macros";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), macrosPlugin(), svgr()],
  build: {
    target: "es2015",
    outDir: "build",
  },
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      pages:"/src/pages",
      style:"/src/style",
      store:"/src/store",
      utils:"/src/utils",
      routes: "/src/routes",
      assets:"/src/assets",
      "@i18n": "/src/i18n.js",
    },
  },
})
