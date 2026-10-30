export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const url = new URL(req.url);
  
  // 拼接目标谷歌 API 地址（精准保留原始请求路径和参数）
  const targetUrl = new URL(url.pathname + url.search, 'https://generativelanguage.googleapis.com');

  // 清理 host 请求头，避免被谷歌拒收
  const headers = new Headers(req.headers);
  headers.delete('host');

  // 原生 Edge 流式转发
  return fetch(targetUrl, {
    method: req.method,
    headers: headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined,
  });
}
