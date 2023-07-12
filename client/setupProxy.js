import { createProxyMiddleware } from 'http-proxy-middleware';

export default function setupProxy(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://api.example.com', // 目标服务器的URL
      changeOrigin: true,
    })
  );
}