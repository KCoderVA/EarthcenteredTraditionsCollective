# AI / LLM Workflow Documentation

## Overview

This project is designed for AI-assisted development ("vibe coding") using GitHub Copilot. This document explains how to get the most out of Copilot for this project, which prompt templates to use, and best practices for reviewing AI-generated code.

## GitHub Copilot Setup

### Prerequisites
- VS Code with the `github.copilot` and `github.copilot-chat` extensions installed
- Active GitHub Copilot subscription
- The `.github/copilot-instructions.md` file (already present in this repo) — Copilot Chat automatically reads this for project context

### Enabling Copilot Chat project context
Copilot Chat reads `.github/copilot-instructions.md` automatically when you open this workspace. You don't need to paste project context manually.

---

## Prompt Templates

Located in `.github/prompts/`, these are starter prompts for Copilot Chat:

| Prompt file | When to use |
|-------------|-------------|
| `new-page.prompt.md` | Creating a new HTML page |
| `new-component.prompt.md` | Creating a new JavaScript UI component |
| `members-feature.prompt.md` | Adding a feature to the members area |
| `event-integration.prompt.md` | Adding a new event or calendar feature |
| `style-component.prompt.md` | Styling a new UI component |

### How to use a prompt template

1. Open Copilot Chat in VS Code (`Ctrl+Shift+I` / `Cmd+Shift+I`)
2. Type `@workspace` then reference the prompt file:
   ```
   @workspace Using .github/prompts/new-page.prompt.md as a guide, create a new Resources page at src/public/resources.html. The page should list books, websites, and local groups related to earth-centered traditions.
   ```
3. Review the generated code carefully before accepting
4. Fill in the `[FILL IN]` placeholders from the prompt template

---

## Copilot Chat Slash Commands

| Command | Use case |
|---------|---------|
| `/explain` | Understand what a block of code does |
| `/fix` | Fix a selected error or problem |
| `/doc` | Generate JSDoc for selected function |
| `/tests` | Generate Jest tests for selected code |
| `/new` | Scaffold a new file (use prompt templates instead) |

**Examples:**
```
/explain  [select the auth.js checkAuthState function]
/fix  [select an ESLint error in events.js]
/doc  [select the EventCard class]
/tests  [select the filterEvents function]
```

---

## Effective Prompting Techniques

### Be specific about files
Instead of: *"add an accordion to the contact page"*
Use: *"Edit `src/public/contact.html` to add an accordion FAQ section below the contact form. Use the `.accordion` CSS class pattern already in `src/public/assets/css/main.css`. Make it keyboard-accessible."*

### Reference existing patterns
*"Look at how `EventCard` is implemented in `src/public/assets/js/events.js` and create a similar `DocumentCard` class in `src/public/assets/js/document-library.js`."*

### Include constraints
*"Generate only vanilla JavaScript (no frameworks). Use ES2022 syntax. Add JSDoc comments. Follow the BEM naming convention used in main.css."*

### Ask for incremental changes
*"First, just add the HTML structure for the accordion. Don't add the CSS or JS yet."*

### Review and iterate
Don't accept the first output blindly. Ask follow-up questions:
- *"This looks good, but the focus management for keyboard users is missing. Add ARIA attributes and keyboard support."*
- *"The JS uses innerHTML — that's a security risk. Rewrite it to use createElement and textContent."*

---

## AI Code Review Checklist

When reviewing AI-generated code, always check for:

### Security
- [ ] No `innerHTML` with user-supplied data (use `textContent` or sanitize)
- [ ] No `eval()` or `new Function()`
- [ ] No hard-coded credentials, API keys, or tokens
- [ ] No sensitive data written to localStorage
- [ ] Form inputs are validated before use

### Accessibility
- [ ] All images have `alt` text
- [ ] All form inputs have `<label>` elements
- [ ] ARIA attributes are used correctly (not redundantly)
- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus management is correct for modals/dynamic content

### Performance
- [ ] No unnecessary DOM queries in loops
- [ ] Event listeners are cleaned up in `destroy()` methods
- [ ] Images use `loading="lazy"`
- [ ] No blocking scripts

### Code quality
- [ ] Follows the naming conventions in `copilot-instructions.md`
- [ ] JSDoc is accurate and complete
- [ ] Error cases are handled (null checks, empty states)
- [ ] No `console.log` left in production code (use `console.warn`/`console.error` only)
- [ ] TODO comments are meaningful and actionable

---

## Vibe-Coding Best Practices

1. **Commit frequently** — small, focused commits give Copilot better context and make reviews easier
2. **Keep files focused** — one component or feature per file; avoid mega-files
3. **Use descriptive variable names** — Copilot autocomplete is better with meaningful names
4. **Write your intent as a comment first** — type `// Get all upcoming events sorted by date` and let Copilot complete the implementation
5. **Use the terminal** — run `npm run lint`, `npm test` after AI-generated code; fix errors iteratively
6. **Don't AI your tests** — write tests manually first (TDD) or review AI-generated tests very carefully; tests are your safety net
7. **Document as you go** — after Copilot generates a function, use `/doc` to generate JSDoc, then review it

---

## Known Copilot Limitations for This Project

| Limitation | Workaround |
|------------|-----------|
| Copilot may suggest React/Vue patterns | Remind it: "Use vanilla JS only, no frameworks" |
| May generate inaccessible HTML | Always run through WAVE or Axe accessibility checker |
| May hard-code colors instead of CSS variables | Remind it: "Use CSS custom properties from :root" |
| May add `innerHTML` with user data | Manually replace with `textContent` or DOM methods |
| May not know about the build script's INCLUDE directives | Remind it to use `<!-- INCLUDE:nav -->` and `<!-- INCLUDE:footer -->` |
| May generate outdated Google OAuth examples | Check against [Google Identity Services docs](https://developers.google.com/identity) |
