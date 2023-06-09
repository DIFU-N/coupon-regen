// vite.config.js
import { defineConfig } from "file:///C:/Users/Awesome%20Cinagro/Desktop/blankspace/niamo/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Awesome%20Cinagro/Desktop/blankspace/niamo/node_modules/@vitejs/plugin-react/dist/index.mjs";
import fs from "fs";
var vite_config_default = defineConfig({
  server: {
    https: {
      key: fs.readFileSync("./mkcert/localhost+2-key.pem"),
      cert: fs.readFileSync("./mkcert/localhost+2.pem")
    }
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ["js-big-decimal"]
  },
  build: {
    rollupOptions: {
      external: ["axios", "http-proxy-middleware"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBd2Vzb21lIENpbmFncm9cXFxcRGVza3RvcFxcXFxibGFua3NwYWNlXFxcXG5pYW1vXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxBd2Vzb21lIENpbmFncm9cXFxcRGVza3RvcFxcXFxibGFua3NwYWNlXFxcXG5pYW1vXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9Bd2Vzb21lJTIwQ2luYWdyby9EZXNrdG9wL2JsYW5rc3BhY2UvbmlhbW8vdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHNlcnZlcjoge1xuICAgIGh0dHBzOiB7XG4gICAgICBrZXk6IGZzLnJlYWRGaWxlU3luYygnLi9ta2NlcnQvbG9jYWxob3N0KzIta2V5LnBlbScpLFxuICAgICAgY2VydDogZnMucmVhZEZpbGVTeW5jKCcuL21rY2VydC9sb2NhbGhvc3QrMi5wZW0nKSxcbiAgICB9LFxuICB9LFxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGV4Y2x1ZGU6IFsnanMtYmlnLWRlY2ltYWwnXVxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGV4dGVybmFsOiBbJ2F4aW9zJywgJ2h0dHAtcHJveHktbWlkZGxld2FyZSddLFxuICAgIH0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtVixTQUFTLG9CQUFvQjtBQUNoWCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxRQUFRO0FBR2YsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsS0FBSyxHQUFHLGFBQWEsOEJBQThCO0FBQUEsTUFDbkQsTUFBTSxHQUFHLGFBQWEsMEJBQTBCO0FBQUEsSUFDbEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLGdCQUFnQjtBQUFBLEVBQzVCO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixVQUFVLENBQUMsU0FBUyx1QkFBdUI7QUFBQSxJQUM3QztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
