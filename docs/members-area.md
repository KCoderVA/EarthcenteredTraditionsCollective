# Members Area Documentation

## Overview

The members area provides club members with access to a document library, a detailed event calendar, and exclusive content. It is located at `/members/` and requires authentication to access.

## Current Authentication Approach

> ⚠️ **Security Note:** The current authentication is **client-side only** and is NOT cryptographically secure. It relies on localStorage to track login state and is suitable for protecting non-sensitive club content from casual visitors. It should **not** be used to protect truly sensitive information.

### How it works (v0.1)

1. A member visits `/members/` (the portal login page)
2. They enter their username and a shared club password (configured as a constant in `auth.js`)
3. On success, a session token is stored in `localStorage`
4. Every members page calls `checkAuthState()` on load — if no valid token is found, the user is redirected to the login page
5. "Logout" clears the localStorage token and redirects to the homepage

### Auth flow diagram

```
User visits /members/library.html
        │
        ▼
auth.js: checkAuthState()
        │
        ├── No token in localStorage ──▶ Redirect to /members/
        │
        └── Token found
                │
                ▼
        Validate token (check expiry, format)
                │
                ├── Invalid/expired ──▶ Clear token → Redirect to /members/
                │
                └── Valid ──▶ Show page content
```

### Limitations of v0.1 auth

- The password is embedded in the JavaScript source — anyone who reads the source code can log in
- localStorage is accessible to any JavaScript running on the page (XSS risk)
- No per-user tracking — all members share the same credentials
- Sessions don't expire properly across devices

### Auth roadmap (planned v1.0)

Replace the localStorage approach with **Google OAuth 2.0 via Google Identity Services**:

- Members log in with their Google account
- Only pre-approved Google accounts (club members) get access
- Session managed by Google's OAuth tokens (more secure, proper expiry)
- No password to manage or share

See the `// TODO(auth):` comments in `auth.js` for implementation notes.

## Document Library Structure

The document library (`/members/library.html`) organizes club documents into four categories:

### Categories

| Category | Description | Examples |
|----------|-------------|---------|
| **Rituals & Ceremonies** | Scripts and guides for sabbat and esbat rituals | Samhain ritual script, Full Moon circle guide |
| **Study Materials** | Educational resources for members | Reading lists, tradition introductions, mythology notes |
| **Event Planning** | Templates and resources for organizing events | Event checklist, setup guide, catering notes |
| **Administrative** | Club governance and records | Meeting minutes, bylaws, member directory template |

### Document storage

Documents are hosted on **Google Drive** (not in this repository). The library page links out to Google Drive:
- Set each document to "Anyone with the link can view"
- Or use Google Drive folder sharing to restrict to club members' Google accounts
- Copy the share link into `members/library.html` as described in [content-guide.md](./content-guide.md)

### Search and filter

The document library includes client-side search and category filtering powered by `document-library.js`. The search operates on:
- Document title
- Document description
- Category name

## RSVP System Design

### Public events RSVP

For public events (non-members-only):
1. Event RSVP links to a Google Form
2. Google Form collects: Name, Email, Number attending, any notes
3. Responses go to a Google Sheet managed by club admins
4. Admins follow up by email as needed

### Members-only events RSVP

For members-only events:
1. The RSVP button is only visible after `checkAuthState()` confirms membership
2. The RSVP form is embedded directly on the members calendar page
3. Same Google Forms + Sheets approach

### Future RSVP enhancements (ideas)

- Email confirmation on RSVP submission
- RSVP count display (would require a backend)
- Waitlist for capacity-limited events
- Cancel RSVP option

## Adding a New Members Page

1. Copy `src/public/members/library.html` as a template
2. Add the auth check (required — see template below)
3. Add the members sidebar navigation
4. Link to the new page from the sidebar in all other members pages
5. Update the build script if needed

### Required auth check pattern

```html
<script type="module">
  import { checkAuthState, redirectIfNotAuth } from '/assets/js/auth.js';
  // SECURITY NOTE: This is client-side-only auth. Content here is not truly private.
  // See docs/members-area.md for the auth roadmap and limitations.
  redirectIfNotAuth();
</script>
```

## Access Control Matrix

| Page | Public | Members | Notes |
|------|--------|---------|-------|
| `/index.html` | ✅ | ✅ | Homepage |
| `/about.html` | ✅ | ✅ | About the club |
| `/events.html` | ✅ | ✅ | Public events |
| `/contact.html` | ✅ | ✅ | Contact form |
| `/members/` | ✅ (login) | ✅ (dashboard) | Redirects by auth state |
| `/members/library.html` | ❌ redirect | ✅ | Document library |
| `/members/calendar.html` | ❌ redirect | ✅ | Full calendar + RSVP |
