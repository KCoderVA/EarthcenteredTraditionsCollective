# New JavaScript Component Prompt Template

Use this prompt with GitHub Copilot Chat when creating a new vanilla JavaScript UI component for the Earthcentered Traditions Collective website.

---

## Instructions for Copilot

Create a new JavaScript component for the Earthcentered Traditions Collective website.

**Component name:** [FILL IN: PascalCase, e.g., `AccordionMenu`, `EventFilter`, `PhotoGallery`]
**File path:** [FILL IN: e.g., `src/public/assets/js/accordion-menu.js`]
**Purpose:** [FILL IN: Describe what this component does]
**Used on pages:** [FILL IN: Which HTML pages will use this component?]

### Required component structure:

```javascript
/**
 * @fileoverview [COMPONENT NAME] component for Earthcentered Traditions Collective.
 * [Brief description of the component's purpose and behavior]
 *
 * @module [component-name]
 */

'use strict';

/**
 * [COMPONENT NAME] - [one-line description]
 *
 * @example
 * const myComponent = new [ComponentName](document.getElementById('my-element'), {
 *   option1: 'value',
 * });
 * myComponent.init();
 */
class [ComponentName] {
  /**
   * @param {HTMLElement} container - The root DOM element for this component
   * @param {Object} [options={}] - Configuration options
   * @param {string} [options.option1] - Description of option1
   */
  constructor(container, options = {}) {
    this.container = container;
    this.options = { ...this.defaults, ...options };
    this._boundHandlers = {}; // store bound handlers for cleanup
  }

  /** @type {Object} Default configuration */
  get defaults() {
    return {
      // FILL IN default options
    };
  }

  /**
   * Initialize the component: render DOM, attach event listeners.
   * @returns {[ComponentName]} this instance for chaining
   */
  init() {
    this._render();
    this._attachListeners();
    return this;
  }

  /**
   * Render the component's DOM structure.
   * @private
   */
  _render() {
    // FILL IN DOM manipulation
  }

  /**
   * Attach event listeners. Store bound references for cleanup.
   * @private
   */
  _attachListeners() {
    // FILL IN event listeners
    // Example: this._boundHandlers.click = this._handleClick.bind(this);
    //          this.container.addEventListener('click', this._boundHandlers.click);
  }

  /**
   * Remove all event listeners and clean up DOM changes.
   */
  destroy() {
    Object.entries(this._boundHandlers).forEach(([event, handler]) => {
      this.container.removeEventListener(event, handler);
    });
  }
}

export { [ComponentName] };
```

### Component requirements:
1. **Accessibility:**
   - Add appropriate ARIA attributes (`aria-expanded`, `aria-controls`, `aria-selected`, etc.) for interactive patterns
   - Keyboard navigation: [FILL IN: which keys should work, e.g., Enter/Space to activate, arrow keys to navigate]
   - Announce dynamic changes with `aria-live` regions if content updates after user action

2. **Events the component should emit (custom events):**
   - [FILL IN: e.g., `component:initialized`, `item:selected`, `form:submitted`]

3. **Public API methods needed:**
   - [FILL IN: e.g., `open()`, `close()`, `toggle()`, `setItems(data)`]

4. **Styling:**
   - Component CSS should live in `main.css` under a `/* [ComponentName] */` comment block
   - Use CSS custom properties from `:root` — no hard-coded colors or sizes
   - Follow BEM: `.component-name__element--modifier`
   - Include focus-visible styles for keyboard navigation

5. **Error handling:**
   - Guard against missing container element
   - Log meaningful warnings to console (use `console.warn`)
   - Handle empty/null data gracefully

### Usage example to include in JSDoc:
[FILL IN: Show how the component will be instantiated and used on an HTML page]
