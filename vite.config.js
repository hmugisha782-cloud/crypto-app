import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) return "vendor-react";
          if (id.includes("MarketCards50")) return "telemetry-cards";
          if (id.includes("EarnAndBetHub") || id.includes("LiveChatAndVideo") || id.includes("OmniAiCopilot")) return "enterprise-hubs";
        },
      },
    },
  },
});
