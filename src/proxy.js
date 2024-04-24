import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    "/api", // Specify the path prefix to proxy
    createProxyMiddleware({
      target: "http://localhost:4000", // Specify the target URL to proxy to
      changeOrigin: true, // Needed for virtual hosted sites
      secure: false, // Do not verify SSL certificates
    })
  );
};
