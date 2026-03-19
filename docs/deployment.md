# Deployment Guide

## Overview

The Earthcentered Traditions Collective website is deployed as a static site to **GitHub Pages** via the `deploy.yml` GitHub Actions workflow. Deployment is automatic on every push to the `main` branch (after CI passes).

**Live site:** `https://kcoderva.github.io/EarthcenteredTraditionsCollective`

## Deployment Architecture

```
Push to main
    │
    ▼
GitHub Actions: ci.yml (lint + test + validate)
    │ (passes)
    ▼
GitHub Actions: deploy.yml
    │
    ├── Checkout code
    ├── npm ci
    ├── npm run build  →  dist/
    └── peaceiris/actions-gh-pages
            │
            └── Pushes dist/ to gh-pages branch
                        │
                        ▼
                  GitHub Pages CDN
                  (auto-deploys from gh-pages branch)
```

## First-Time GitHub Pages Setup

1. Go to your repository on GitHub
2. Navigate to **Settings → Pages**
3. Under **Source**, select **Deploy from a branch**
4. Set **Branch** to `gh-pages` and folder to `/ (root)`
5. Click **Save**
6. The first deploy via Actions will create the `gh-pages` branch automatically

## Build Process

The build script (`scripts/build.js`) performs the following steps:

1. **Clean** the `dist/` directory
2. **Copy** all files from `src/public/` to `dist/`
3. **Inject components** — replaces `<!-- INCLUDE:nav -->` and `<!-- INCLUDE:footer -->` markers in HTML files with the contents of the corresponding component files
4. Assets (CSS, JS, images) are copied as-is

### Running a build locally

```bash
npm run build
```

Output is in `dist/`. You can preview it with:
```bash
npx serve dist
```

## Environment Variables

This is a static site — **no environment variables are needed for deployment**. There is no server-side runtime.

If you add features that require API keys (e.g., a future Google OAuth client ID):
- Store the key in a `.env` file locally (already gitignored)
- For the public site, embed non-secret client-side keys directly in HTML/JS with clear comments
- Never embed secret keys (only public/client-side keys that are safe to expose)

## Custom Domain Configuration

To use a custom domain (e.g., `earthcenteredtraditions.org`):

1. Purchase and configure your domain with your DNS provider
2. Add a `CNAME` file to `src/public/` with your domain:
   ```
   earthcenteredtraditions.org
   ```
3. In your DNS provider, add:
   - Type: `CNAME`, Name: `www`, Value: `kcoderva.github.io`
   - Type: `A`, Name: `@`, Values: GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
4. In **GitHub Settings → Pages → Custom domain**, enter your domain
5. Enable **Enforce HTTPS** after the certificate provisions (may take a few minutes)

## CDN and Caching

GitHub Pages uses a CDN (Fastly). Cache headers are managed by GitHub and cannot be customized. For cache-busting:
- Use versioned filenames for major CSS/JS changes: `main.v2.css`
- Or append a query string during build: `main.css?v=0.1.0`

## Post-Deploy Checklist

After each significant deployment, verify:

- [ ] Homepage loads at the live URL
- [ ] Navigation links work correctly
- [ ] Events page shows correct event cards
- [ ] Contact page Google Form embed loads
- [ ] Members portal login/redirect works
- [ ] Members library page redirects unauthenticated users
- [ ] All pages pass Lighthouse accessibility ≥ 90
- [ ] No JavaScript errors in browser console
- [ ] Images load (not broken links)
- [ ] Mobile layout renders correctly (test in DevTools responsive mode)

## Rollback

To roll back to a previous deployment:

```bash
# Find the commit hash you want to roll back to
git log --oneline main

# Create a revert commit
git revert <bad-commit-hash>
git push origin main

# This triggers a new deploy from the reverted state
```

Alternatively, in GitHub Actions → Workflows → Deploy → re-run a previous successful workflow run.

## Troubleshooting Deployments

| Problem | Cause | Fix |
|---------|-------|-----|
| Deploy workflow fails at `npm run build` | Build script error | Check workflow logs; run `npm run build` locally to reproduce |
| Site shows 404 for all pages | gh-pages branch not configured | Check Settings → Pages source is set to `gh-pages` |
| CSS/JS not loading on custom domain | Wrong asset paths | Ensure paths are root-relative (`/assets/css/main.css`) not relative |
| Google Form iframes blocked | CSP meta tag issue | Check `frame-src` in page CSP; Google Forms requires `https://docs.google.com` |
| Old content showing after deploy | CDN cache | Wait 5–10 minutes; try hard-reload (Ctrl+Shift+R) |
