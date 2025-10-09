// Full GitHub OAuth flow for Decap CMS using a Netlify Function.
// Handles initial redirect to GitHub and code exchange, then posts the token
// back to the CMS window via postMessage as expected by Decap.

const AUTH_URL = 'https://github.com/login/oauth/authorize'
const TOKEN_URL = 'https://github.com/login/oauth/access_token'

function htmlMessage(type, payload) {
  const msg = `authorization:github:${type}:${JSON.stringify(payload)}`
  return `<!doctype html><html><body><script>
    (function(){
      try {
        if (window.opener && window.opener.postMessage) {
          window.opener.postMessage(${JSON.stringify(msg)}, '*');
          window.close();
        } else {
          document.body.textContent = 'You can close this window.';
        }
      } catch (e) {
        document.body.textContent = 'Authorized. You can close this window.';
      }
    })();
  </script></body></html>`
}

exports.handler = async (event) => {
  const qs = event.queryStringParameters || {}
  const code = qs.code
  const clientId = process.env.GH_CLIENT_ID
  const clientSecret = process.env.GH_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    return { statusCode: 500, body: 'Missing GitHub OAuth env vars' }
  }

  // Build our own redirect URI from headers to support both preview and custom domains
  const proto = (event.headers['x-forwarded-proto'] || 'https')
  const host = (event.headers['x-forwarded-host'] || event.headers.host)
  const redirectUri = `${proto}://${host}/.netlify/functions/gh-auth`

  if (!code) {
    // Initial step: redirect to GitHub authorize
    const scope = 'repo' // use 'public_repo' if your repo is public only
    const url = new URL(AUTH_URL)
    url.searchParams.set('client_id', clientId)
    url.searchParams.set('redirect_uri', redirectUri)
    url.searchParams.set('scope', scope)
    return { statusCode: 302, headers: { Location: url.toString() } }
  }

  // Exchange code for token
  try {
    const resp = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code, redirect_uri: redirectUri }),
    })
    const data = await resp.json()
    if (data.error || !data.access_token) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html', 'Cache-Control': 'no-store' },
        body: htmlMessage('error', { message: data.error_description || 'OAuth exchange failed' })
      }
    }
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html', 'Cache-Control': 'no-store' },
      body: htmlMessage('success', { token: data.access_token })
    }
  } catch (e) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html', 'Cache-Control': 'no-store' },
      body: htmlMessage('error', { message: e && e.message ? e.message : 'OAuth error' })
    }
  }
}
