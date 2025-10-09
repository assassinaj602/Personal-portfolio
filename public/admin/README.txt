Decap CMS (GitHub backend) setup notes

1) Create a GitHub OAuth App
   - Homepage URL: https://<your-site>.netlify.app
   - Authorization callback URL: https://<your-site>.netlify.app/.netlify/functions/gh-auth

2) Add environment variables to Netlify Site settings → Build & deploy → Environment
   - GH_CLIENT_ID: <GitHub OAuth client id>
   - GH_CLIENT_SECRET: <GitHub OAuth client secret>

3) Trigger a deploy (push to main or click Redeploy) and open /admin.

If login fails, check Netlify Functions logs and ensure the OAuth app URLs match your site origin exactly.This folder contains the Decap CMS admin app. The config.yml defines collections.
