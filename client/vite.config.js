import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// In sviluppo, il dev server di Vite gira su una porta diversa dal backend Express:
// questo proxy inoltra le chiamate /api verso il server così il frontend può
// usare percorsi relativi (/api/...) sia in sviluppo che in produzione.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
