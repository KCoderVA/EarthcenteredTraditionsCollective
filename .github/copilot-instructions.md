# GitHub Copilot Instructions — Earthcentered Traditions Collective

## Project Overview

This is the website repository for the **Earthcentered Traditions Collective**, a local extracurricular religious club celebrating earth-centered spiritual traditions (including pagan, Wiccan, druidic, animist, and nature-based paths). The website serves both public visitors and club members.

**Primary goals:**
- Welcoming public presence with introductory and informational pages
- Members-only access-controlled document library and calendar
- Event discovery, RSVP, and community engagement
- Mailing list distribution and Google Forms integration
- Fully accessible, mobile-first, and performant static site

## Hosting & Tech Stack

- **Hosting:** GitHub Pages (static site, no server-side runtime)
- **Languages:** Vanilla HTML5, CSS3, JavaScript (ES2022 modules) — no frameworks
- **Build tooling:** Node.js 20, npm scripts, live-server (dev), custom build script
- **Linting/Formatting:** ESLint, Prettier, stylelint, html-validate
- **Testing:** Jest + jsdom
- **CI/CD:** GitHub Actions → GitHub Pages
- **AI tooling:** GitHub Copilot (code) + Copilot Chat (planning/docs)

## Code Style Rules

- Follow `.prettierrc`: singleQuote, semi, tabWidth 2, printWidth 100, trailingComma es5
- Follow `.eslintrc.json`: no-var, prefer-const, prefer-template, eqeqeq, camelCase
- Follow `.stylelintrc.json`: BEM selector pattern, no named colors, modern CSS functions
- Follow `.editorconfig`: UTF-8, LF line endings, 2-space indent for JS/HTML/CSS/JSON
- **Naming conventions:**
  - Files: `kebab-case.html`, `kebab-case.css`, `kebab-case.js`
  - CSS classes: BEM — `.block__element--modifier`
  - JS: `camelCase` for variables/functions, `PascalCase` for classes
  - Constants: `SCREAMING_SNAKE_CASE`
  - IDs: `kebab-case`

## File Organization

```
src/public/
├── index.html            # Homepage
├── about.html            # About the club
├── events.html           # Public events listing
├── contact.html          # Contact + Google Form
├── members/
│   ├── index.html        # Members portal / login
│   ├── library.html      # Document library (auth-gated)
│   └── calendar.html     # Members calendar (auth-gated)
├── assets/
│   ├── css/
│   │   ├── main.css      # Global styles
│   │   └── members.css   # Members-area styles
│   ├── js/
│   │   ├── main.js       # Global scripts
│   │   ├── auth.js       # Auth state management
│   │   ├── events.js     # Events module
│   │   ├── mailing-list.js
│   │   └── document-library.js
│   └── images/           # Optimized image assets
└── components/           # Reusable HTML snippets
    ├── nav.html
    ├── footer.html
    └── event-card.html
```

## Accessibility Requirements (WCAG 2.1 AA)

- All images must have descriptive `alt` attributes (empty `alt=""` for decorative images)
- All form inputs must have associated `<label>` elements
- Color contrast ratio: minimum 4.5:1 for body text, 3:1 for large text
- All interactive elements must be keyboard-focusable and have visible focus indicators
- Use semantic HTML elements: `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<header>`, `<footer>`
- Use ARIA roles/labels only when semantic HTML is insufficient
- Skip-to-main-content link on every page
- Mobile tap targets: minimum 44×44px
- No content should rely solely on color to convey meaning

## Performance Guidelines

- No JavaScript frameworks (React, Vue, etc.) — vanilla JS only
- Lazy-load images with `loading="lazy"` attribute
- CSS custom properties for theming (no runtime JS theming)
- Minimize third-party scripts; load async/defer where required
- Target Lighthouse score ≥ 90 for Performance, Accessibility, Best Practices, SEO
- Optimize images before committing (WebP preferred, with PNG fallback)
- Use system font stacks where possible; load web fonts sparingly

## Security Considerations

- **Never commit secrets, API keys, tokens, or credentials** to this repository
- Use `.env` files for any local secrets (already gitignored)
- Sanitize all user-supplied input before rendering to the DOM (use `textContent`, never `innerHTML` with user data)
- Implement a Content Security Policy (CSP) meta tag on all pages
- Google Forms embeds are the preferred method for data collection (no custom backend needed)
- The `members/` area uses client-side auth state; treat it as "security by obscurity" for now — document the limitations clearly
- Never store sensitive member data (passwords, PII) in localStorage

## Members Area Authentication Notes

- **Current implementation:** localStorage-based auth state (username + session token)
- **Planned upgrade:** Google OAuth 2.0 via Google Identity Services
- Auth check functions live in `src/public/assets/js/auth.js`
- Every members page must call `checkAuthState()` on load and redirect to `members/index.html` if unauthenticated
- Document the auth limitations prominently in `docs/members-area.md`
- TODO markers: `// TODO(auth): Replace with Google OAuth` at relevant points

## Component Naming Conventions

- HTML component files: `src/public/components/<component-name>.html`
- Include comments for component boundaries: `<!-- COMPONENT: nav -->`
- Build script processes `<!-- INCLUDE:nav -->` and `<!-- INCLUDE:footer -->` directives
- JS component classes: `PascalCase` matching the component name (e.g., `EventCard`, `DocumentLibrary`)

## Commit Message Format (Conventional Commits)

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `content`, `ci`
**Scopes:** `homepage`, `events`, `members`, `library`, `calendar`, `auth`, `nav`, `footer`, `ci`, `docs`, `deps`

**Examples:**
- `feat(events): add RSVP form to event cards`
- `fix(auth): correct redirect loop on members portal`
- `content(events): add Summer Solstice Celebration event`
- `chore(deps): update eslint to v8.57.0`

## HTML Generation Guidelines

When generating HTML pages:
1. Start with the HTML5 doctype and proper `<html lang="en">` attribute
2. Include complete `<head>` with: charset, viewport, title, description meta, OG tags, canonical URL, CSS link
3. Add skip-to-content link as first element in `<body>`
4. Use `<header>`, `<nav>`, `<main>`, `<footer>` landmark elements
5. Replace `<!-- INCLUDE:nav -->` and `<!-- INCLUDE:footer -->` markers (build script injects components)
6. Add `aria-label` to all `<nav>` elements
7. Use `<h1>` only once per page; maintain logical heading hierarchy
8. Add `role="alert"` to error/success message containers

## CSS Generation Guidelines

When generating CSS:
1. Use CSS custom properties defined in `:root` (see `main.css` for the design token set)
2. Follow mobile-first approach: base styles for mobile, `@media (min-width: 768px)` for tablet, `@media (min-width: 1024px)` for desktop, `@media (min-width: 1280px)` for wide
3. Use BEM naming: `.block__element--modifier`
4. Support `@media (prefers-color-scheme: dark)` for dark mode
5. Support `@media (prefers-reduced-motion: reduce)` for animations
6. Never use `!important` unless absolutely necessary and commented
7. Group properties: positioning → box model → typography → visual → animation

## JavaScript Generation Guidelines

When generating JavaScript:
1. Use ES2022 modules (`import`/`export`) where the build supports it; otherwise IIFE pattern
2. Add JSDoc comments to all exported functions and classes
3. Use `const` by default, `let` only when reassignment is needed; never `var`
4. Prefer `addEventListener` over `on*` attributes
5. Use `DOMContentLoaded` or module-level init for setup
6. Handle errors gracefully; display user-friendly messages
7. Use `textContent` for user-data DOM insertion (never `innerHTML` with untrusted data)
8. Add `// TODO(feature-name): description` for incomplete features

## LLM/AI Usage Notes for Vibe-Coding Workflow

This project is designed for AI-assisted development ("vibe coding"). Guidelines:

- **Use the prompt files** in `.github/prompts/` as starting points for Copilot Chat tasks
- Reference specific files when asking Copilot to make changes: "Edit `src/public/events.html` to..."
- For new pages, start with the `new-page.prompt.md` template
- For new JS components, start with `new-component.prompt.md`
- Always review AI-generated code for: security issues, accessibility gaps, hard-coded data, missing error handling
- Keep AI-generated comments and JSDoc; clean up hallucinated or incorrect logic
- Commit frequently with descriptive messages so AI context stays fresh
- Use Copilot Chat's `/fix`, `/explain`, and `/doc` slash commands for targeted tasks
