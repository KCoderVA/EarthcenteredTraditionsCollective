# System Architecture

## Overview

The Earthcentered Traditions Collective website is a **static site** hosted on GitHub Pages. There is no server-side runtime or database. All dynamic behavior is handled by client-side JavaScript, with data collection delegated to Google Forms and Google Calendar.

```
┌─────────────────────────────────────────────────────┐
│                  GitHub Repository                   │
│  ┌──────────────┐    ┌───────────────────────────┐  │
│  │  Source Files │    │  GitHub Actions CI/CD     │  │
│  │  src/public/ │───▶│  lint → test → build      │  │
│  └──────────────┘    └─────────────┬─────────────┘  │
└────────────────────────────────────│────────────────┘
                                     │ npm run build
                                     ▼
                              ┌─────────────┐
                              │  dist/ dir  │
                              └──────┬──────┘
                                     │ peaceiris/actions-gh-pages
                                     ▼
                         ┌───────────────────────┐
                         │   GitHub Pages CDN    │
                         │  (gh-pages branch)    │
                         └───────────┬───────────┘
                                     │ HTTPS
                                     ▼
                              ┌─────────────┐
                              │   Browser   │
                              └─────────────┘
```

## Directory Structure

```
EarthcenteredTraditionsCollective/
│
├── .github/                  # GitHub configuration
│   ├── workflows/            # GitHub Actions CI/CD pipelines
│   │   ├── ci.yml            # Lint, test, validate on push/PR
│   │   ├── deploy.yml        # Build & deploy to GitHub Pages
│   │   └── lint-and-format.yml  # PR lint check + comment
│   ├── ISSUE_TEMPLATE/       # Issue form templates
│   ├── prompts/              # Copilot Chat prompt templates
│   ├── copilot-instructions.md  # Copilot project context
│   └── PULL_REQUEST_TEMPLATE.md
│
├── .vscode/                  # VS Code workspace settings
│
├── docs/                     # Project documentation (this dir)
│
├── scripts/                  # Node.js build/utility scripts
│   ├── build.js              # Builds src/public → dist/
│   ├── setup-hooks.js        # Installs git pre-commit hook
│   └── validate-html.js      # Runs html-validate on all pages
│
├── hooks/                    # Git hooks source
│   └── pre-commit            # Pre-commit lint/format/validate
│
├── src/
│   └── public/               # Web root (served as-is in dev)
│       ├── index.html        # Homepage
│       ├── about.html        # About the club
│       ├── events.html       # Public events listing
│       ├── contact.html      # Contact + Google Form
│       ├── members/          # Members-only section
│       │   ├── index.html    # Portal login/dashboard
│       │   ├── library.html  # Document library
│       │   └── calendar.html # Members calendar
│       ├── assets/
│       │   ├── css/
│       │   │   ├── main.css     # Global styles + design tokens
│       │   │   └── members.css  # Members-area styles
│       │   ├── js/
│       │   │   ├── main.js           # Global scripts
│       │   │   ├── auth.js           # Auth state management
│       │   │   ├── events.js         # Events module
│       │   │   ├── mailing-list.js   # Mailing list form
│       │   │   └── document-library.js  # Doc library
│       │   └── images/       # Optimized image assets
│       └── components/       # Reusable HTML snippets
│           ├── nav.html
│           ├── footer.html
│           └── event-card.html
│
├── dist/                     # Build output (gitignored)
├── .editorconfig
├── .eslintrc.json
├── .gitignore
├── .htmlvalidate.json
├── .prettierrc
├── .stylelintrc.json
├── package.json
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── LICENSE
```

## Data Flow

### Public page request
```
Browser → GitHub Pages CDN → dist/[page].html
       → Loads main.css (styles)
       → Loads main.js (interactivity: nav, smooth scroll, lazy images)
       → Google Calendar iframe (events page) → Google's CDN
       → Google Forms iframe (contact/mailing list) → Google's CDN
```

### Members area request
```
Browser → dist/members/[page].html
       → Loads auth.js → checks localStorage for session token
       → If no token: redirects to /members/ (login page)
       → If token valid: renders members content
       → Document links → Google Drive (external, members must have Drive access)
```

### Build process
```
scripts/build.js:
  1. Copy src/public/** → dist/
  2. For each .html file in dist/:
     a. Read file content
     b. Replace <!-- INCLUDE:nav --> with components/nav.html content
     c. Replace <!-- INCLUDE:footer --> with components/footer.html content
  3. Done (no minification in v0.1 — see TODO in build.js)
```

## Technology Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Hosting | GitHub Pages | Free, integrated with repo, zero-config SSL |
| Framework | None (vanilla) | No build complexity, fast loads, easy for contributors |
| Auth | Client-side localStorage | MVP only; Google OAuth planned for v1.0 |
| Data collection | Google Forms | No backend needed, familiar to non-technical admins |
| Calendar | Google Calendar embed | Managed by club admins, no custom backend |
| Mailing list | Google Forms → Sheets | Simple, free, manageable by non-technical admins |
| CSS methodology | BEM + CSS custom properties | Readable, maintainable, no toolchain dependency |
| Build tool | Custom Node.js script | Minimal deps, easy to understand and modify |

## Integrations

```
EarthcenteredTraditionsCollective Website
        │
        ├── Google Forms (data collection)
        │   ├── Contact form (contact.html)
        │   ├── Mailing list signup (index.html)
        │   ├── Event RSVP forms (events.html, members/calendar.html)
        │   └── Members feedback (future)
        │
        ├── Google Calendar (event display)
        │   ├── Public calendar embed (events.html)
        │   └── Members calendar embed (members/calendar.html)
        │
        └── Google Drive (document library)
            └── Document links (members/library.html)
                [Members need Drive access granted separately]
```

## Security Model

Since this is a static site with no server:

- **No secrets stored in the codebase** — API keys would be in `.env` (gitignored) but none are needed for the current feature set
- **Content Security Policy** headers set via `<meta>` tags on all pages
- **Members area** is protected by client-side JavaScript only — this is "security by obscurity"
- **Sensitive member data** should never be stored on this site — use Google Drive with proper access controls for documents
- **Forms** submit to Google Forms, so no user data touches our infrastructure

See [members-area.md](./members-area.md) for the auth roadmap.
