import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";
import { fileURLToPath } from "node:url";

// Configuração independente do Lovable — roda como um app Node.js comum.
// Para trocar de alvo de deploy (Vercel, Netlify, Cloudflare...), troque
// apenas o `preset` abaixo. "node-server" funciona em qualquer VPS,
// Railway, Render, Fly.io etc.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 8080,
  },
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      server: { entry: "server" },
    }),
    nitro({ preset: "node-server" }),
    viteReact(),
  ],
});
