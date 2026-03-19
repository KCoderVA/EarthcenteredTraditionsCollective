# Members Feature Prompt Template

Use this prompt with GitHub Copilot Chat when adding a new feature to the members-only area of the Earthcentered Traditions Collective website.

---

## Instructions for Copilot

Add a new feature to the members-only area of the Earthcentered Traditions Collective website.

**Feature name:** [FILL IN: e.g., "Prayer Request Board", "Ritual Planning Tool", "Study Circle Sign-Up"]
**Files to create/modify:**
- HTML: [FILL IN: e.g., `src/public/members/prayer-requests.html`]
- JS: [FILL IN: e.g., `src/public/assets/js/prayer-requests.js`]
- CSS additions: `src/public/assets/css/members.css`

**Purpose:** [FILL IN: What does this feature allow members to do?]

---

### Auth gate requirement (MANDATORY for ALL members pages)

Every members page MUST include this authentication check at the top of its `<script>` block or module:

```javascript
import { checkAuthState, redirectIfNotAuth } from '/assets/js/auth.js';

// Redirect to login if not authenticated
redirectIfNotAuth();

document.addEventListener('DOMContentLoaded', () => {
  const user = checkAuthState();
  if (!user) return; // redirectIfNotAuth handles the redirect
  
  // Initialize feature with user context
  initFeature(user);
});
```

The members navigation sidebar must be present on all members pages:

```html
<nav class="members-sidebar" aria-label="Members navigation">
  <ul class="members-sidebar__nav">
    <li><a href="/members/" class="members-sidebar__link">Dashboard</a></li>
    <li><a href="/members/library.html" class="members-sidebar__link">Document Library</a></li>
    <li><a href="/members/calendar.html" class="members-sidebar__link">Calendar &amp; Events</a></li>
    <!-- ADD NEW FEATURE LINK HERE -->
    <li><button class="members-sidebar__link members-sidebar__link--logout" id="logout-btn">Sign Out</button></li>
  </ul>
</nav>
```

---

### Feature implementation checklist:

1. **HTML page structure:**
   - Use `src/public/members/` as the directory
   - Include `<!-- INCLUDE:nav -->` (top nav) and `<!-- INCLUDE:footer -->`
   - Include `members.css` in addition to `main.css`
   - Add the members sidebar nav
   - Wrap main content in `<main class="members-layout__content" id="main-content">`

2. **Data handling:**
   - For now, use localStorage or in-memory mock data
   - Add `// TODO(backend): Replace with API call to [endpoint]` comments where real data will come from
   - Never store sensitive data in localStorage

3. **Member-specific UI:**
   - Show the member's display name in the header: `<span class="members-header__username"></span>`
   - Loading states: add `.is-loading` class with spinner while data loads
   - Empty states: show helpful message when no data exists

4. **Accessibility:**
   - The feature should be fully keyboard navigable
   - Dynamic content updates should use `aria-live="polite"` regions
   - Modal dialogs (if any) must trap focus and support Escape to close

5. **Google Forms integration (if this feature collects data):**
   - Embed the Google Form using an `<iframe>` with title attribute
   - Provide a direct link as fallback for iframe failures
   - Form embed code:
     ```html
     <iframe
       src="https://docs.google.com/forms/d/e/[FORM_ID]/viewform?embedded=true"
       title="[FEATURE NAME] Form"
       class="google-form-embed"
       frameborder="0"
       marginheight="0"
       marginwidth="0"
       loading="lazy"
     >Loading form…</iframe>
     ```

---

### Security reminder:
- The members area has NO server-side auth — it is protected by client-side JS only
- This means the feature data should not be sensitive enough to require real security
- Add this comment to every members JS file:
  ```javascript
  // SECURITY NOTE: This is client-side-only auth. Content here is not truly private.
  // See docs/members-area.md for the auth roadmap and limitations.
  ```
