import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200,
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: "vendor-react", test: /node_modules[\\/](react|react-dom)/, priority: 30 },
            { name: "omni-super-hubs", test: /src[\\/]components[\\/]Omni.*Hub\.jsx/, priority: 20 },
            { name: "enterprise-hubs", test: /src[\\/]components[\\/]/, priority: 10 },
          ],
        },
      },
    },
  },
});
