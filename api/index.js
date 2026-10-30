export default async function handler(req, res) {
  const url = new URL(req.url, `https://${req.headers.host}`);
  const targetUrl = `https://generativelanguage.googleapis.com${url.pathname}${url.search}`;

  // 清理 host 头，避免 Google API 拒绝访问
  const requestHeaders = new Headers(req.headers);
  requestHeaders.delete('host');

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: requestHeaders,
      body: req.method !== 'GET' && req.method !== 'HEAD' 
        ? (typeof req.body === 'string' ? req.body : JSON.stringify(req.body)) 
        : undefined,
    });

    const data = await response.text();
    res.status(response.status).send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
