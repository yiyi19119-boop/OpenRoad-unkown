export default async function handler(req, res) {
  // 拼接谷歌 API 目标 URL
  const targetUrl = `https://generativelanguage.googleapis.com${req.url}`;

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
