import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins:[react()],server:{proxy:{"/api":"http://127.0.0.1:3001"}},
  build: {
    chunkSizeWarningLimit: 3000,
    
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: "vendor-react", test: /node_modules[\\/](react|react-dom)/, priority: 30 },
            { name: "ten-thousand-matrix", test: /sovereignTenThousandSuite/, priority: 15 },
            { name: "omni-super-hubs", test: /src[\\/]components[\\/]Omni.*Hub\.jsx/, priority: 20 },
            { name: "enterprise-hubs", test: /src[\\/]components[\\/]/, priority: 10 },
          ],
        },
      },
    },
  },
});
