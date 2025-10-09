// Minimal GitHub OAuth exchange for Decap CMS using Netlify Functions
// Docs: https://decapcms.org/docs/backends-overview/#using-the-github-backend

exports.handler = async (event) => {
  const params = new URLSearchParams(event.body || '')
  const code = params.get('code') || (event.queryStringParameters && event.queryStringParameters.code)
  if (!code) {
    return { statusCode: 400, body: 'Missing code' }
  }
  const clientId = process.env.GH_CLIENT_ID
  const clientSecret = process.env.GH_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    return { statusCode: 500, body: 'Missing GitHub OAuth env vars' }
  }
  try {
    const resp = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    })
    const data = await resp.json()
    if (data.error) {
      return { statusCode: 400, body: JSON.stringify(data) }
    }
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      body: JSON.stringify({ token: data.access_token, provider: 'github' }),
    }
  } catch (e) {
    return { statusCode: 500, body: e && e.message ? e.message : 'OAuth error' }
  }
}
