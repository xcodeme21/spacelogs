// vite.config.ts
import { defineConfig } from "file:///private/var/www/html/spacelogs/node_modules/vite/dist/node/index.js";
import adonisjs from "file:///private/var/www/html/spacelogs/node_modules/@adonisjs/vite/build/src/client/main.js";
import tailwindcss from "file:///private/var/www/html/spacelogs/node_modules/tailwindcss/lib/index.js";
var vite_config_default = defineConfig({
  plugins: [
    adonisjs({
      /**
       * Entrypoints of your application. Each entrypoint will
       * result in a separate bundle.
       */
      entrypoints: ["resources/css/app.css", "resources/js/app.js", "resources/js/home.js"],
      /**
       * Paths to watch and reload the browser on file change
       */
      reload: ["resources/views/**/*.edge"]
    })
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvcHJpdmF0ZS92YXIvd3d3L2h0bWwvc3BhY2Vsb2dzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvcHJpdmF0ZS92YXIvd3d3L2h0bWwvc3BhY2Vsb2dzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9wcml2YXRlL3Zhci93d3cvaHRtbC9zcGFjZWxvZ3Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGFkb25pc2pzIGZyb20gJ0BhZG9uaXNqcy92aXRlL2NsaWVudCdcbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tICd0YWlsd2luZGNzcydcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIGFkb25pc2pzKHtcbiAgICAgIC8qKlxuICAgICAgICogRW50cnlwb2ludHMgb2YgeW91ciBhcHBsaWNhdGlvbi4gRWFjaCBlbnRyeXBvaW50IHdpbGxcbiAgICAgICAqIHJlc3VsdCBpbiBhIHNlcGFyYXRlIGJ1bmRsZS5cbiAgICAgICAqL1xuICAgICAgZW50cnlwb2ludHM6IFsncmVzb3VyY2VzL2Nzcy9hcHAuY3NzJywgJ3Jlc291cmNlcy9qcy9hcHAuanMnLCAncmVzb3VyY2VzL2pzL2hvbWUuanMnXSxcblxuICAgICAgLyoqXG4gICAgICAgKiBQYXRocyB0byB3YXRjaCBhbmQgcmVsb2FkIHRoZSBicm93c2VyIG9uIGZpbGUgY2hhbmdlXG4gICAgICAgKi9cbiAgICAgIHJlbG9hZDogWydyZXNvdXJjZXMvdmlld3MvKiovKi5lZGdlJ10sXG4gICAgfSksXG4gIF0sXG4gIGNzczoge1xuICAgIHBvc3Rjc3M6IHtcbiAgICAgIHBsdWdpbnM6IFt0YWlsd2luZGNzcygpXSxcbiAgICB9LFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1EsU0FBUyxvQkFBb0I7QUFDNVMsT0FBTyxjQUFjO0FBQ3JCLE9BQU8saUJBQWlCO0FBRXhCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLFNBQVM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BS1AsYUFBYSxDQUFDLHlCQUF5Qix1QkFBdUIsc0JBQXNCO0FBQUE7QUFBQTtBQUFBO0FBQUEsTUFLcEYsUUFBUSxDQUFDLDJCQUEyQjtBQUFBLElBQ3RDLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTLENBQUMsWUFBWSxDQUFDO0FBQUEsSUFDekI7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
