# Portfolio Website (Vite + React + Tailwind + Framer Motion + Decap CMS)

Create everything inside the #codebase directory. Use JavaScript (not TypeScript) unless TypeScript is requested. Use Vite + React. Use Tailwind CSS for styles and Framer Motion for animations. Integrate Netlify CMS (Decap CMS) as described with git-gateway backend. Use markdown files (YAML frontmatter) for content under src/data/* so Netlify CMS can create/edit them. Implement Netlify Forms for contact. Add netlify.toml and a clear README describing how to enable Netlify Identity, Git Gateway, and how to use the admin UI to add/edit content. Provide sample data and images. Ensure dark theme by default and ensure accessibility practices. Add CI workflow to lint and test. Make the UI professional and minimal, with subtle animations.

## How to run locally

```powershell
cd "#codebase"
npm install
npm run dev
```

Open http://localhost:5173

### Troubleshooting dev server
- If you see 404 for /@vite/client or "Unexpected token '<'" for /src/main.jsx, it means the browser is not getting JS from Vite (likely an HTML fallback). Fixes:
   - Ensure the Vite dev server is running in this folder (npm run dev) and you open exactly http://localhost:5173
   - Avoid special characters like `#` in the project path. On Windows, either rename the folder or create a junction without `#`:
      ```powershell
      cmd /c mklink /J "d:\New folder (4)\Portfolio Website\codebase" "d:\New folder (4)\Portfolio Website\#codebase"
      cd "d:\New folder (4)\Portfolio Website\codebase"
      npm run dev
      ```
   - Hard-refresh or open a fresh incognito tab (to avoid caching a previous server).
   - Ensure only one dev server runs on port 5173.

## Build

```powershell
npm run build
npm run preview
```

## Deploy to Netlify

1. Push this repo to GitHub
2. In Netlify, "New site from Git" and select the repo
3. Build command: `npm run build`  Publish directory: `dist`
4. After deploy, enable Identity and Git Gateway:
   - Site settings → Identity → Enable Identity
   - Enable Git Gateway in Identity settings
   - Invite yourself (owner) via Identity to log in
5. Visit https://<your-site>/admin to sign in and edit content

### Netlify CMS Admin
- Admin URL: `/admin`
- Config file: `public/admin/config.yml` (commented and easy to change)
- Media uploads go to `public/images`
- CMS writes Markdown to `src/data/<collection>` and JSON to `src/data/socials.json`

### Netlify Forms
- Contact form is in `src/components/ContactForm.jsx`
- Uses `data-netlify="true"` and a honeypot field `bot-field`
- Submissions appear in Netlify → Forms

## Editing CMS schema
- Edit `public/admin/config.yml` to add fields/collections
- Each collection has `folder: src/data/...` and `create: true`

## Accessibility
- Skip link, focus outlines, keyboard-friendly components, and aria labels

## SEO
- Meta tags in `index.html`; add your site title/description and social image
- Consider adding sitemap.xml and robots.txt (add simple static files under public/ if needed)

## Folder Structure

- `public/admin/` → CMS index.html and config.yml
- `public/images/` → uploaded assets
- `src/data/` → content (Markdown with YAML frontmatter or JSON)
- `src/components/` → UI components

## CI
- GitHub Actions workflow `.github/workflows/ci.yml` runs lint and tests on PRs and pushes to main

## Contributing
See `CONTRIBUTING.md` for how to tweak Tailwind colors, CMS schemas, and add collections.
