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
  const forcedBase = process.env.OAUTH_REDIRECT_BASE // e.g. https://portfolio-muhammad-assadullah.netlify.app
  const base = forcedBase && forcedBase.trim() ? forcedBase.replace(/\/$/, '') : `${proto}://${host}`
  const redirectUri = `${base}/.netlify/functions/gh-auth`

  if (qs.debug === '1') {
    const scope = (process.env.GH_SCOPE && process.env.GH_SCOPE.trim()) || 'repo'
    const debugAuth = new URL(AUTH_URL)
    debugAuth.searchParams.set('client_id', clientId || '')
    debugAuth.searchParams.set('scope', scope)
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: `<!doctype html><html><body style="font-family:system-ui;padding:16px;">
        <h1>GitHub OAuth Debug</h1>
        <p><strong>Computed base</strong>: ${base}</p>
        <p><strong>redirectUri</strong>: ${redirectUri}</p>
        <p><strong>x-forwarded-host</strong>: ${event.headers['x-forwarded-host'] || ''}</p>
        <p><strong>host</strong>: ${event.headers.host || ''}</p>
        <p><strong>client_id</strong>: ${(clientId || '').slice(0,4)}…</p>
        <p><strong>scope</strong>: ${scope}</p>
        <p><a href="${debugAuth.toString()}">Begin OAuth on GitHub</a> (no redirect_uri parameter included)</p>
      </body></html>`
    }
  }

  if (!code) {
    // Initial step: redirect to GitHub authorize. Omit redirect_uri so GitHub uses the app’s configured callback.
    const scope = (process.env.GH_SCOPE && process.env.GH_SCOPE.trim()) || 'repo'
    const url = new URL(AUTH_URL)
    url.searchParams.set('client_id', clientId)
    url.searchParams.set('scope', scope)
    return { statusCode: 302, headers: { Location: url.toString() } }
  }

  // Exchange code for token
  try {
    const resp = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  // Omit redirect_uri here as well; GitHub will validate against the app’s configured callback
  body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
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
