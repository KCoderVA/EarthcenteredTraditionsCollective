# New Page Prompt Template

Use this prompt with GitHub Copilot Chat when creating a new public-facing HTML page for the Earthcentered Traditions Collective website.

---

## Instructions for Copilot

Create a new HTML page for the Earthcentered Traditions Collective website with the following specifications:

**Page name/title:** [FILL IN: e.g., "Resources", "Gallery", "Newsletter Archive"]
**URL path:** [FILL IN: e.g., `src/public/resources.html`]
**Purpose:** [FILL IN: Describe what this page does and who it's for]

### Required structure:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="[PAGE DESCRIPTION - 150-160 chars]" />
    <meta property="og:title" content="[PAGE TITLE] | Earthcentered Traditions Collective" />
    <meta property="og:description" content="[PAGE DESCRIPTION]" />
    <meta property="og:type" content="website" />
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self'; frame-src https://docs.google.com https://calendar.google.com; img-src 'self' data: https:;" />
    <title>[PAGE TITLE] | Earthcentered Traditions Collective</title>
    <link rel="stylesheet" href="/assets/css/main.css" />
  </head>
  <body>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <!-- INCLUDE:nav -->
    <main id="main-content">
      <!-- PAGE CONTENT HERE -->
    </main>
    <!-- INCLUDE:footer -->
    <script src="/assets/js/main.js" type="module"></script>
  </body>
</html>
```

### Page content to include:
1. A `<section class="page-hero">` with an `<h1>` heading and subtitle
2. [FILL IN: List the sections/content blocks needed for this page]
3. At least one call-to-action button linking to a relevant page or action
4. Proper `aria-label` attributes on all `<section>` elements

### Accessibility requirements:
- All images use descriptive `alt` text (or `alt=""` if decorative)
- All form inputs have `<label>` elements with `for` attributes
- Headings follow logical h1 → h2 → h3 hierarchy
- Interactive elements have visible focus styles (inherited from main.css)
- Color contrast meets WCAG 2.1 AA (inherited from design tokens)

### Navigation active state:
Set the correct nav link as active. Add `aria-current="page"` to the nav link for this page.

The active nav item for this page is: [FILL IN: Home / About / Events / Contact / Members]
