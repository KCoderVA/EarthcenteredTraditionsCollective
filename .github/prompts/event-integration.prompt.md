# Event / Calendar Integration Prompt Template

Use this prompt with GitHub Copilot Chat when integrating a new event or calendar feature for the Earthcentered Traditions Collective website.

---

## Instructions for Copilot

Integrate a new event or calendar feature for the Earthcentered Traditions Collective website.

**Feature type:** [FILL IN: e.g., "New recurring event series", "Google Calendar embed", "RSVP form for specific event", "Past events archive"]
**Target page(s):** [FILL IN: e.g., `src/public/events.html`, `src/public/members/calendar.html`]
**Event name (if applicable):** [FILL IN: e.g., "Autumn Equinox Gathering", "Monthly Study Circle"]

---

### Event data structure

All events in this project follow this schema. When creating mock/sample data, use this format:

```javascript
/**
 * @typedef {Object} EventData
 * @property {string} id - Unique slug, e.g. 'autumn-equinox-2025'
 * @property {string} title - Full event title
 * @property {string} shortTitle - Short title for cards (≤30 chars)
 * @property {string} date - ISO 8601 date string, e.g. '2025-09-22'
 * @property {string} time - Human-readable time, e.g. '7:00 PM – 10:00 PM ET'
 * @property {string} location - Venue name and/or address
 * @property {boolean} isOnline - True if online/hybrid event
 * @property {string} description - Full description (HTML allowed)
 * @property {string} shortDescription - 1-2 sentence summary for cards
 * @property {string} category - One of: 'sabbat', 'esbat', 'study-circle', 'social', 'workshop', 'other'
 * @property {boolean} membersOnly - True if restricted to members
 * @property {string|null} rsvpFormUrl - Google Form URL for RSVP, or null
 * @property {string|null} imageUrl - Path to event image, or null
 * @property {string[]} tags - Array of topic tags
 */
```

### Earth-centered traditions calendar dates (use for realistic mock data):

| Event | Approx. Date | Category |
|-------|-------------|----------|
| Imbolc | Feb 1–2 | sabbat |
| Ostara (Spring Equinox) | Mar 19–21 | sabbat |
| Beltane | May 1 | sabbat |
| Litha (Summer Solstice) | Jun 19–21 | sabbat |
| Lughnasadh / Lammas | Aug 1 | sabbat |
| Mabon (Autumn Equinox) | Sep 21–23 | sabbat |
| Samhain | Oct 31 | sabbat |
| Yule (Winter Solstice) | Dec 19–21 | sabbat |
| Full Moon Esbat | Monthly | esbat |
| New Moon Circle | Monthly | esbat |

---

### Event card HTML template

When rendering event cards, use this structure:

```html
<article class="event-card" data-event-id="[id]" data-category="[category]">
  <div class="event-card__date-badge" aria-hidden="true">
    <span class="event-card__month">[MMM]</span>
    <span class="event-card__day">[DD]</span>
  </div>
  <div class="event-card__body">
    <span class="event-card__category-tag">[Category Label]</span>
    <h3 class="event-card__title">[Event Title]</h3>
    <p class="event-card__meta">
      <time datetime="[ISO date]">[Full date string]</time> · [Location]
    </p>
    <p class="event-card__description">[Short description]</p>
  </div>
  <div class="event-card__actions">
    <a href="[rsvpFormUrl]" class="btn btn--primary" target="_blank" rel="noopener noreferrer"
       aria-label="RSVP for [Event Title]">RSVP</a>
    <a href="#event-[id]" class="btn btn--ghost">Details</a>
  </div>
</article>
```

---

### Google Calendar embed

For calendar embeds, use this iframe pattern:

```html
<div class="calendar-embed" role="region" aria-label="Event Calendar">
  <iframe
    src="https://calendar.google.com/calendar/embed?src=[CALENDAR_ID]&ctz=America%2FNew_York&mode=MONTH&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0"
    title="Earthcentered Traditions Collective Event Calendar"
    class="calendar-embed__iframe"
    frameborder="0"
    scrolling="no"
    loading="lazy"
  ></iframe>
  <p class="calendar-embed__fallback">
    <a href="https://calendar.google.com/calendar/r?cid=[CALENDAR_ID]" target="_blank" rel="noopener noreferrer">
      Open calendar in Google Calendar ↗
    </a>
  </p>
</div>
```

Replace `[CALENDAR_ID]` with the actual calendar ID (URL-encoded).

---

### RSVP integration checklist:

- [ ] Create or link to Google Form for RSVP
- [ ] Add form URL to event data `rsvpFormUrl` field
- [ ] Embed form OR link to form from event card
- [ ] Add success message after RSVP submission (for direct form submissions)
- [ ] For members-only events: gate the RSVP behind `checkAuthState()` in `auth.js`
- [ ] Update `events.js` mock data with the new event
- [ ] Add event to the Google Calendar (manual step — document in PR)
