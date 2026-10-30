export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const url = new URL(req.url);
  
  // 拼接目标谷歌 API 地址
  const targetUrl = new URL(url.pathname + url.search, 'https://generativelanguage.googleapis.com');

  // 复制请求头并清理 host
  const headers = new Headers(req.headers);
  headers.delete('host');

  // 原生流式转发，不进行任何数据拦截与等待
  return fetch(targetUrl, {
    method: req.method,
    headers: headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
  });
}
