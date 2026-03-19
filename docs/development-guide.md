# Development Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- **Git** ≥ 2.40: [git-scm.com](https://git-scm.com/)
- **Node.js** ≥ 20.x (LTS): [nodejs.org](https://nodejs.org/) — use [nvm](https://github.com/nvm-sh/nvm) to manage versions
- **npm** ≥ 10.x (bundled with Node.js 20)
- **VS Code** (recommended): [code.visualstudio.com](https://code.visualstudio.com/)

Verify your setup:
```bash
node --version   # Should be v20.x.x or higher
npm --version    # Should be 10.x.x or higher
git --version    # Should be 2.40.x or higher
```

## Initial Setup

### 1. Clone the repository

```bash
git clone https://github.com/KCoderVA/EarthcenteredTraditionsCollective.git
cd EarthcenteredTraditionsCollective
```

### 2. Install dependencies

```bash
npm install
```

This will:
- Install all devDependencies (ESLint, Prettier, Jest, live-server, etc.)
- Automatically run `scripts/setup-hooks.js` (via `postinstall`) to install the pre-commit git hook

### 3. Open in VS Code

```bash
code EarthcenteredTraditionsCollective.code-workspace
```

When prompted, install the recommended extensions. These are pre-configured in `.vscode/extensions.json`.

### 4. Start the development server

```bash
npm run dev
```

This starts `live-server` on `http://localhost:5500` with auto-reload on file changes. The browser should open automatically.

## Development Workflow

### Feature branch workflow

```bash
# 1. Ensure you're on the latest main
git checkout main
git pull origin main

# 2. Create a feature branch
git checkout -b feat/your-feature-name

# 3. Make your changes, then stage them
git add -p   # Review changes interactively

# 4. Commit with Conventional Commits format
git commit -m "feat(events): add summer solstice event card"

# 5. Push and open a PR
git push origin feat/your-feature-name
# Then open a PR via GitHub UI or gh CLI
gh pr create --title "feat(events): add summer solstice event card"
```

### Conventional Commits format

```
<type>(<scope>): <short description>

[optional body — explain WHY, not WHAT]

[optional footer — e.g., "Closes #42"]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `content`, `ci`
**Scopes:** `homepage`, `events`, `members`, `library`, `calendar`, `auth`, `nav`, `footer`, `ci`, `docs`, `deps`

## npm Scripts Reference

| Script | Command | Description |
|--------|---------|-------------|
| `npm run dev` | `live-server src/public` | Start dev server on port 5500 |
| `npm run build` | `node scripts/build.js` | Build to `dist/` |
| `npm run lint` | `eslint src/ --ext .js` | Lint JavaScript files |
| `npm run lint:fix` | `eslint src/ --ext .js --fix` | Auto-fix linting issues |
| `npm run format` | `prettier --write .` | Format all files |
| `npm run format:check` | `prettier --check .` | Check formatting (CI mode) |
| `npm run stylelint` | `stylelint "src/**/*.css"` | Lint CSS files |
| `npm run validate:html` | `node scripts/validate-html.js` | Validate all HTML files |
| `npm test` | `jest --coverage` | Run tests with coverage |
| `npm run test:watch` | `jest --watch` | Run tests in watch mode |
| `npm run ci` | `lint:all + format:check + test` | Full CI check |

## Testing Approach

Tests live in `__tests__/` directories next to the code they test, or in `*.test.js` files.

**Running tests:**
```bash
npm test              # Run all tests + coverage report
npm run test:watch    # Watch mode for TDD
```

**Test file naming:**
- `src/public/assets/js/events.js` → `src/public/assets/js/__tests__/events.test.js`
- Or: `src/public/assets/js/events.test.js`

**What to test:**
- JavaScript module functions (especially data transformation, filtering, auth logic)
- DOM manipulation helpers
- Form validation logic

**What NOT to test (for now):**
- HTML structure (use html-validate instead)
- CSS (use stylelint instead)
- Third-party integrations (Google Forms, Calendar)

## Linting and Formatting

### ESLint (JavaScript)
```bash
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix safe issues
```

### Prettier (all file types)
```bash
npm run format        # Format everything
npm run format:check  # Check without writing (used in CI)
```

### Stylelint (CSS)
```bash
npm run stylelint       # Check for issues
npm run stylelint:fix   # Auto-fix safe issues
```

### HTML Validate
```bash
npm run validate:html   # Validate all HTML files
```

## Pre-commit Hook

The `postinstall` script installs a git pre-commit hook at `.git/hooks/pre-commit`. This hook automatically runs before each commit:

1. ESLint on staged `.js` files
2. Prettier check on staged files
3. html-validate on staged `.html` files

If any check fails, the commit is blocked. Fix the issues and try again.

To bypass the hook (use sparingly, only for WIP commits):
```bash
git commit --no-verify -m "wip: ..."
```

## Adding a New Page

1. Copy `src/public/index.html` as a starting point
2. Update `<title>`, `<meta name="description">`, and `<h1>`
3. Set `aria-current="page"` on the correct nav link
4. Add your content sections
5. Update `scripts/build.js` if the page needs any special processing
6. Run `npm run validate:html` to check for issues

## Debugging Tips

### Browser DevTools
- Use the **Sources** tab to set breakpoints in JS files
- Use the **Network** tab to check that assets load correctly
- Use the **Accessibility** tab to inspect ARIA tree and find a11y issues
- Use **Lighthouse** (in the **Audits** tab) for performance + accessibility scoring

### Common issues

| Issue | Fix |
|-------|-----|
| Live server not auto-reloading | Check that you saved the file; try restarting `npm run dev` |
| CSS changes not showing | Hard-reload (Ctrl+Shift+R / Cmd+Shift+R) to bypass cache |
| ESLint not running in VS Code | Ensure `dbaeumer.vscode-eslint` extension is installed and enabled |
| Pre-commit hook not running | Run `node scripts/setup-hooks.js` manually; check hook is executable |
| Members page not redirecting | Check browser console; verify `auth.js` is loading correctly |
| Google Form not loading in iframe | Check CSP `frame-src` directive in the page's `<meta>` CSP tag |

## VS Code Tips

- **Copilot Chat**: Use `/explain` on selected code, `/fix` for errors, `/doc` to generate JSDoc
- **Live Server**: Click "Go Live" in the status bar to start the dev server from VS Code
- **Error Lens**: Inline error/warning display powered by the `usernamehw.errorlens` extension
- **TODO Highlight**: TODOs appear highlighted — keep track of `// TODO:` comments
- **GitLens**: Hover over any line to see git blame, history, and diff
