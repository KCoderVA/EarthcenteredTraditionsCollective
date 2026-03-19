# Contributing to Earthcentered Traditions Collective

Thank you for your interest in contributing to our community website! Whether you're fixing a bug, improving accessibility, updating content, or adding new features, your help is appreciated.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). We are committed to maintaining a welcoming, inclusive community.

## Ways to Contribute

- 🐛 **Report bugs** using the [Bug Report](.github/ISSUE_TEMPLATE/bug_report.yml) template
- ✨ **Request features** using the [Feature Request](.github/ISSUE_TEMPLATE/feature_request.yml) template
- 📝 **Request content updates** using the [Content Update](.github/ISSUE_TEMPLATE/content_update.yml) template
- 💻 **Submit pull requests** with code or content changes
- 💬 **Join discussions** in [GitHub Discussions](https://github.com/KCoderVA/EarthcenteredTraditionsCollective/discussions)

## Getting Started

### Fork and set up

1. [Fork the repository](https://github.com/KCoderVA/EarthcenteredTraditionsCollective/fork)
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/EarthcenteredTraditionsCollective.git
   cd EarthcenteredTraditionsCollective
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the dev server:
   ```bash
   npm run dev
   ```

### Create a feature branch

```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/bug-you-are-fixing
```

## Coding Standards

### JavaScript

- Vanilla JS only — no frameworks (React, Vue, etc.)
- ES2022 modules (`import`/`export`)
- `const` by default, `let` only when needed, never `var`
- JSDoc comments on all exported functions and classes
- Run `npm run lint` and fix all errors before submitting

### CSS

- BEM naming: `.block__element--modifier`
- Use CSS custom properties from `:root` — no hard-coded colors or sizes
- Mobile-first media queries
- Run `npm run stylelint` and fix all errors

### HTML

- Valid HTML5 (run `npm run validate:html`)
- Semantic elements: `<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`
- All images need descriptive `alt` attributes
- All form inputs need `<label>` elements

### General

- Follow `.editorconfig` settings (UTF-8, LF, 2-space indent)
- Run `npm run format` to format your code before committing
- Keep lines under 100 characters

## Commit Message Format (Conventional Commits)

```
<type>(<scope>): <short description>

[optional body]

[optional footer — e.g., "Closes #42"]
```

**Types:**
- `feat` — New feature
- `fix` — Bug fix
- `docs` — Documentation only
- `style` — CSS/design changes (no logic change)
- `refactor` — Code restructure (no functional change)
- `test` — Adding or fixing tests
- `chore` — Config, dependencies, tooling
- `content` — Website content update (text, events, documents)
- `ci` — CI/CD changes

**Scopes:** `homepage`, `events`, `members`, `library`, `calendar`, `auth`, `nav`, `footer`, `ci`, `docs`, `deps`

**Examples:**
```
feat(events): add Imbolc 2026 event card
fix(auth): correct redirect loop on members portal login
content(events): update Samhain venue to Community Center Hall B
chore(deps): update eslint to v8.57.0
```

## Submitting a Pull Request

1. Make sure all checks pass locally:
   ```bash
   npm run ci
   ```
2. Push your branch:
   ```bash
   git push origin feat/your-feature-name
   ```
3. [Open a pull request](https://github.com/KCoderVA/EarthcenteredTraditionsCollective/compare) against the `main` branch
4. Fill in the [PR template](.github/PULL_REQUEST_TEMPLATE.md) completely
5. Wait for CI checks to pass and for a review

## Issue Labels

| Label | Description |
|-------|-------------|
| `bug` | Something is broken |
| `enhancement` | New feature or improvement |
| `content` | Website content update |
| `accessibility` | Accessibility issue or improvement |
| `good first issue` | Good for newcomers |
| `help wanted` | Extra attention needed |
| `documentation` | Documentation improvement |

## Questions?

Open a [GitHub Discussion](https://github.com/KCoderVA/EarthcenteredTraditionsCollective/discussions) or send an email to hello@earthcenteredtraditions.org.
