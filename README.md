# Earthcentered Traditions Collective (E.T.C.)

[![CI](https://github.com/KCoderVA/EarthcenteredTraditionsCollective/actions/workflows/ci.yml/badge.svg)](https://github.com/KCoderVA/EarthcenteredTraditionsCollective/actions/workflows/ci.yml)
[![Deploy](https://github.com/KCoderVA/EarthcenteredTraditionsCollective/actions/workflows/deploy.yml/badge.svg)](https://github.com/KCoderVA/EarthcenteredTraditionsCollective/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](LICENSE)

> *Rooted in tradition. Growing together.*

**Live site:** https://kcoderva.github.io/EarthcenteredTraditionsCollective/

A website for the **Earthcentered Traditions Collective** — a local extracurricular religious club celebrating earth-centered spiritual traditions including pagan, Wiccan, druidic, animist, and nature-based paths.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- 🌿 **Public homepage** — introductory pages, mission, traditions, events preview
- 📅 **Events calendar** — upcoming events, RSVP links, Google Calendar embed
- 📋 **Google Forms integration** — mailing list signup, contact, RSVP
- 🔐 **Members area** — access-controlled document library and calendar
- 📚 **Document library** — categorized members-only resources
- ✉️ **Mailing list** — interactive subscription management
- 🤖 **AI-assisted development** — GitHub Copilot throughout

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic, WCAG 2.1 AA) |
| Styling | CSS3 (custom properties, BEM, mobile-first) |
| Fonts | Cinzel Decorative · Cinzel · IM Fell English (Google Fonts) |
| Scripting | Vanilla JavaScript (ES2022 modules) |
| Build | Node.js 20, npm scripts |
| Dev server | live-server |
| Linting | ESLint · Prettier · stylelint · html-validate |
| CI/CD | GitHub Actions → GitHub Pages |
| AI tooling | GitHub Copilot + Copilot Chat |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 20 or later
- npm 9 or later
- Git

### Installation

```bash
git clone https://github.com/KCoderVA/EarthcenteredTraditionsCollective.git
cd EarthcenteredTraditionsCollective
npm install        # installs deps and sets up git hooks
```

### Development

```bash
npm run dev        # starts live-server at http://localhost:5500
```

The homepage (`index.html`) is served directly from the repository root. Inner pages (events, about, contact, members area) live in `src/public/`.

### Build

```bash
npm run build      # copies everything to dist/
```

### Lint & Format

```bash
npm run lint       # ESLint all JS
npm run format     # Prettier all files
npm run lint:fix   # auto-fix lint issues
```

---

## Project Structure

```
EarthcenteredTraditionsCollective/
├── index.html                   ← PUBLIC HOMEPAGE (GitHub Pages root)
├── .nojekyll                    ← Disables Jekyll processing
├── package.json
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── LICENSE
│
├── src/
│   └── public/                  ← Inner pages & assets
│       ├── about.html
│       ├── events.html
│       ├── contact.html
│       ├── members/
│       │   ├── index.html       ← Members portal
│       │   ├── library.html
│       │   └── calendar.html
│       ├── assets/
│       │   ├── css/
│       │   │   ├── main.css     ← Global styles (design tokens)
│       │   │   └── members.css  ← Members area styles
│       │   ├── js/
│       │   │   ├── main.js
│       │   │   ├── auth.js
│       │   │   ├── events.js
│       │   │   ├── mailing-list.js
│       │   │   └── document-library.js
│       │   └── images/
│       └── components/          ← Reusable HTML snippets
│
├── src/assets/css/
│   └── design-tokens.css        ← Authoritative design system CSS
│
├── docs/                        ← Project documentation
├── scripts/                     ← Build & setup scripts
├── hooks/                       ← Git hooks
│
├── .github/
│   ├── copilot-instructions.md  ← AI coding guidance
│   ├── prompts/                 ← Copilot Chat prompt templates
│   ├── workflows/               ← CI/CD pipelines
│   └── ISSUE_TEMPLATE/
│
└── .vscode/                     ← VS Code workspace settings
```

---

## Development Workflow

1. **Create a branch** from `main`: `git checkout -b feature/your-feature`
2. **Make changes** — the AI will follow `copilot-instructions.md` conventions
3. **Lint & test**: `npm run lint && npm test`
4. **Commit** using [Conventional Commits](https://www.conventionalcommits.org/):
   - `feat: add event RSVP form`
   - `fix: correct nav link alignment`
   - `docs: update members area guide`
5. **Push & open a PR** — CI runs automatically
6. **Merge to main** — deploy to GitHub Pages runs automatically

---

## Design System

The homepage `index.html` is the **canonical design reference**. All pages use:

- **Parchment** color palette (golds, deep greens, warm browns)
- **Cinzel Decorative** for display headings
- **Cinzel** for navigation and subheadings
- **IM Fell English** for body text
- Botanical SVG border decorators between sections
- Earth-centered nature-inspired visual language

See [`src/assets/css/design-tokens.css`](src/assets/css/design-tokens.css) for the full design token reference.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on submitting issues and pull requests.

All contributors are expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## License

[MIT](LICENSE) © 2026 KCoderVA / Earthcentered Traditions Collective
