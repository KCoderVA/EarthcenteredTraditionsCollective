# Earthcentered Traditions Collective

[![CI](https://github.com/KCoderVA/EarthcenteredTraditionsCollective/actions/workflows/ci.yml/badge.svg)](https://github.com/KCoderVA/EarthcenteredTraditionsCollective/actions/workflows/ci.yml)
[![Deploy](https://github.com/KCoderVA/EarthcenteredTraditionsCollective/actions/workflows/deploy.yml/badge.svg)](https://github.com/KCoderVA/EarthcenteredTraditionsCollective/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A community website for the **Earthcentered Traditions Collective** — a local extracurricular club celebrating earth-centered spiritual traditions, seasonal rituals, and the beauty of nature-based paths.

🌐 **Live site:** [kcoderva.github.io/EarthcenteredTraditionsCollective](https://kcoderva.github.io/EarthcenteredTraditionsCollective)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Contributing](#contributing)
- [License](#license)
- [Community](#community)

---

## Features

- 🏠 **Public website** — Homepage, About, Events, and Contact pages
- 🔐 **Members portal** — Access-controlled dashboard, document library, and calendar
- 📅 **Event calendar** — Google Calendar embeds with RSVP via Google Forms
- 📚 **Document library** — Searchable, filterable member resource library
- 📧 **Mailing list** — Sign-up form integrated with Google Forms
- ♿ **Accessible** — WCAG 2.1 AA compliant, semantic HTML5, keyboard navigable
- 🌙 **Dark mode** — Respects `prefers-color-scheme`
- 📱 **Mobile-first** — Responsive design for all screen sizes
- 🤖 **AI-ready** — GitHub Copilot instructions + prompt templates for vibe-coding

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Vanilla HTML5, CSS3, JavaScript (ES2022) |
| Hosting | GitHub Pages (static site) |
| Build | Node.js 20, custom build script |
| Linting | ESLint, stylelint, html-validate |
| Formatting | Prettier |
| Testing | Jest + jsdom |
| CI/CD | GitHub Actions |
| Integrations | Google Forms, Google Calendar, Google Drive |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 20.x ([nodejs.org](https://nodejs.org/))
- **npm** ≥ 10.x (bundled with Node.js 20)
- **Git** ≥ 2.40 ([git-scm.com](https://git-scm.com/))
- **VS Code** (recommended) with the [workspace extensions](.vscode/extensions.json)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/KCoderVA/EarthcenteredTraditionsCollective.git
cd EarthcenteredTraditionsCollective

# 2. Install dependencies (also sets up git pre-commit hook)
npm install

# 3. Open in VS Code (recommended)
code EarthcenteredTraditionsCollective.code-workspace
# Install the recommended extensions when prompted

# 4. Start the development server
npm run dev
# Opens http://localhost:5500 with live reload
```

### Quick Commands

```bash
npm run dev           # Start dev server
npm run build         # Build to dist/
npm run lint          # Lint JavaScript
npm run format        # Format all files
npm run validate:html # Validate HTML
npm test              # Run tests
npm run ci            # Full CI check (lint + format + test)
```

---

## Project Structure

```
EarthcenteredTraditionsCollective/
├── .github/
│   ├── workflows/           # CI/CD pipelines
│   ├── ISSUE_TEMPLATE/      # Issue forms (bug, feature, content)
│   ├── prompts/             # GitHub Copilot Chat prompt templates
│   └── copilot-instructions.md
├── .vscode/                 # VS Code workspace settings
├── docs/                    # Project documentation
├── scripts/                 # Build & utility scripts
├── hooks/                   # Git hook sources
├── src/public/              # Web root
│   ├── index.html           # Homepage
│   ├── about.html
│   ├── events.html
│   ├── contact.html
│   ├── members/             # Members-only area
│   ├── assets/css/          # Stylesheets
│   ├── assets/js/           # JavaScript modules
│   ├── assets/images/
│   └── components/          # Reusable HTML snippets
├── package.json
├── README.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
└── LICENSE
```

Full directory tree is in [docs/architecture.md](docs/architecture.md).

---

## Development Workflow

1. **Branch** — `git checkout -b feat/your-feature`
2. **Develop** — Dev server auto-reloads at `http://localhost:5500`
3. **Check** — `npm run ci` (also runs via pre-commit hook automatically)
4. **Commit** — [Conventional Commits](https://www.conventionalcommits.org/): `feat(events): add Imbolc event card`
5. **PR** — Push and open a PR; GitHub Actions runs CI checks automatically

See [docs/development-guide.md](docs/development-guide.md) for full details.

---

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

- 🐛 [Report a bug](.github/ISSUE_TEMPLATE/bug_report.yml)
- ✨ [Request a feature](.github/ISSUE_TEMPLATE/feature_request.yml)
- 📝 [Request a content update](.github/ISSUE_TEMPLATE/content_update.yml)
- 💬 [GitHub Discussions](https://github.com/KCoderVA/EarthcenteredTraditionsCollective/discussions)

---

## License

[MIT License](LICENSE) © 2026 KCoderVA / Earthcentered Traditions Collective

---

## Community

- 🌿 [Live site](https://kcoderva.github.io/EarthcenteredTraditionsCollective)
- 💬 [GitHub Discussions](https://github.com/KCoderVA/EarthcenteredTraditionsCollective/discussions)
- 📧 hello@earthcenteredtraditions.org

*Rooted in the earth. Guided by the seasons. United in community.* 🌙
