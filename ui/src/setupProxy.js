const createProxyMiddleware = require("http-proxy-middleware");

// Use environment variable for Docker, fallback to localhost for local dev
const API_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
    })
  );

  app.use(
    "/images",
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
    })
  );

  app.use(
    "/ws",
    createProxyMiddleware({
      target: API_URL,
      ws: true,
      changeOrigin: true,
    })
  );
};
