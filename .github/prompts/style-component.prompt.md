# Style Component Prompt Template

Use this prompt with GitHub Copilot Chat when adding CSS styles for a new UI component following the Earthcentered Traditions Collective design system.

---

## Instructions for Copilot

Add CSS styles for a new UI component to the Earthcentered Traditions Collective design system.

**Component name:** [FILL IN: e.g., `accordion`, `photo-gallery`, `testimonial-card`]
**CSS file to edit:** [FILL IN: `src/public/assets/css/main.css` or `src/public/assets/css/members.css`]
**Component purpose:** [FILL IN: Brief description]

---

### Design system tokens (always use these — never hard-code values)

```css
/* Colors */
--color-primary: #3a5a40;        /* Deep forest green */
--color-primary-light: #588157;  /* Medium sage green */
--color-primary-dark: #1b3a2b;   /* Dark pine green */
--color-secondary: #7c5c3e;      /* Warm walnut brown */
--color-secondary-light: #a47c5b;/* Tan/sand */
--color-accent: #c9a84c;         /* Golden amber */
--color-accent-light: #e4c97e;   /* Pale gold */
--color-bg: #faf7f0;             /* Warm cream */
--color-bg-alt: #f0ebe0;         /* Slightly deeper cream */
--color-surface: #ffffff;        /* Card/surface white */
--color-text: #2c2c2c;           /* Near-black body text */
--color-text-muted: #6b6b6b;     /* Secondary/muted text */
--color-text-on-primary: #faf7f0;/* Text on green backgrounds */
--color-border: #d4c9b5;         /* Warm light border */
--color-error: #9b2226;          /* Error red */
--color-success: #386641;        /* Success green */

/* Typography */
--font-heading: 'Palatino Linotype', 'Book Antiqua', Palatino, Georgia, serif;
--font-body: 'Segoe UI', system-ui, -apple-system, sans-serif;
--font-mono: 'Courier New', Courier, monospace;
--font-size-xs: 0.75rem;
--font-size-sm: 0.875rem;
--font-size-base: 1rem;
--font-size-lg: 1.125rem;
--font-size-xl: 1.25rem;
--font-size-2xl: 1.5rem;
--font-size-3xl: 1.875rem;
--font-size-4xl: 2.25rem;

/* Spacing */
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-6: 1.5rem;
--space-8: 2rem;
--space-12: 3rem;
--space-16: 4rem;
--space-24: 6rem;

/* Borders & Radius */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 16px;
--radius-full: 9999px;
--border-width: 1px;
--border-color: var(--color-border);

/* Shadows */
--shadow-sm: 0 1px 3px rgb(0 0 0 / 8%);
--shadow-md: 0 4px 12px rgb(0 0 0 / 10%);
--shadow-lg: 0 8px 24px rgb(0 0 0 / 12%);

/* Transitions */
--transition-fast: 150ms ease;
--transition-base: 250ms ease;
--transition-slow: 400ms ease;

/* Layout */
--container-max: 1280px;
--container-padding: var(--space-4);
```

---

### Required CSS structure for new components

```css
/* ============================================================
   [COMPONENT NAME]
   [Brief description of the component]
   ============================================================ */

/* Base component */
.[component-name] {
  /* Mobile-first base styles */
}

/* Component elements (BEM) */
.[component-name]__[element] {
}

/* Component modifiers (BEM) */
.[component-name]--[modifier] {
}

/* States */
.[component-name].is-active {
}

.[component-name].is-loading {
}

/* Hover (pointer devices only) */
@media (hover: hover) {
  .[component-name]:hover {
  }
}

/* Focus-visible for keyboard navigation */
.[component-name]:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 2px;
}

/* Tablet breakpoint */
@media (min-width: 768px) {
  .[component-name] {
  }
}

/* Desktop breakpoint */
@media (min-width: 1024px) {
  .[component-name] {
  }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .[component-name] {
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .[component-name],
  .[component-name] * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

### Component styling checklist:

- [ ] Uses only CSS custom properties from the design token set above
- [ ] BEM naming: `.block__element--modifier`
- [ ] Mobile-first: base styles are mobile, media queries add complexity
- [ ] Interactive states: `:hover` (pointer-only), `:focus-visible`, `:active`, `.is-disabled`
- [ ] Loading state: `.is-loading` with accessible spinner if async
- [ ] Dark mode: `@media (prefers-color-scheme: dark)` overrides
- [ ] Reduced motion: `@media (prefers-reduced-motion: reduce)` disables animations
- [ ] Minimum touch target size: 44×44px for all clickable elements
- [ ] No hard-coded pixel values for colors, type sizes, or spacing (use tokens)
- [ ] Added component section to the appropriate CSS file with the comment header above
