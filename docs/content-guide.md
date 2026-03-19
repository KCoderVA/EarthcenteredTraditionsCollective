# Content Management Guide

## Overview

This guide explains how non-technical club members and administrators can manage and update website content. For developer-focused changes, see the [Development Guide](./development-guide.md).

## Adding or Editing Page Text

All page content lives in HTML files under `src/public/`. You can edit these files directly in VS Code or any text editor.

### Key files

| Page | File |
|------|------|
| Homepage | `src/public/index.html` |
| About | `src/public/about.html` |
| Events | `src/public/events.html` |
| Contact | `src/public/contact.html` |
| Members Portal | `src/public/members/index.html` |
| Members Library | `src/public/members/library.html` |
| Members Calendar | `src/public/members/calendar.html` |

### Editing tips
- Edit text between HTML tags. For example: `<p>Your new text goes here.</p>`
- Don't remove or change HTML tags, `class` attributes, `id` attributes, or `aria-*` attributes unless you know what they do
- After editing, run `npm run validate:html` to check for any HTML errors

## Adding a New Event

Events are managed in two places:
1. **The JavaScript data** (`src/public/assets/js/events.js`) — for the event cards on the events page
2. **Google Calendar** — for the calendar embeds (managed externally)

### Step 1: Add the event to `events.js`

Open `src/public/assets/js/events.js` and add a new entry to the `EVENTS_DATA` array:

```javascript
{
  id: 'autumn-equinox-2025',             // unique kebab-case slug
  title: 'Autumn Equinox Gathering',
  shortTitle: 'Autumn Equinox',
  date: '2025-09-22',                    // ISO 8601 format
  time: '7:00 PM – 10:00 PM ET',
  location: 'Riverside Community Park, Pavilion B',
  isOnline: false,
  description: 'Join us as we celebrate Mabon, the Autumn Equinox...',
  shortDescription: 'A community gathering to celebrate the Autumn Equinox.',
  category: 'sabbat',                    // sabbat | esbat | study-circle | social | workshop | other
  membersOnly: false,
  rsvpFormUrl: 'https://forms.gle/YOUR_FORM_ID',  // Google Form URL or null
  imageUrl: null,                        // or '/assets/images/autumn-equinox.webp'
  tags: ['equinox', 'mabon', 'outdoor'],
},
```

### Step 2: Add the event to Google Calendar

Log into the club's Google Calendar account and add the event with:
- Full title and description
- Date, time, and location
- A link to the RSVP form in the event description

### Step 3: Create an RSVP form (if needed)

1. Go to [Google Forms](https://forms.google.com)
2. Create a new form with: Name, Email, Number Attending, Dietary notes (optional)
3. Share the form link — add it to the event's `rsvpFormUrl` in `events.js`

## Managing the Document Library

The document library (`src/public/members/library.html`) displays links to documents stored in Google Drive.

### Adding a document

1. Upload the document to the club's Google Drive folder
2. Set sharing to "Anyone with the link can view" (or restrict to club members if Drive supports it)
3. Open `src/public/members/library.html`
4. Find the appropriate category section and add a new document card:

```html
<article class="document-card" data-category="rituals">
  <div class="document-card__icon" aria-hidden="true">📄</div>
  <div class="document-card__body">
    <h3 class="document-card__title">
      <a href="https://drive.google.com/file/d/YOUR_FILE_ID/view"
         target="_blank"
         rel="noopener noreferrer"
         class="document-card__link">
        Your Document Title
      </a>
    </h3>
    <p class="document-card__description">Brief description of the document.</p>
    <p class="document-card__meta">
      <span class="document-card__type">PDF</span> ·
      <time datetime="2025-01-15">January 2025</time>
    </p>
  </div>
</article>
```

### Document categories

| Category | `data-category` value | Description |
|----------|-----------------------|-------------|
| Rituals & Ceremonies | `rituals` | Ritual scripts, ceremony guides |
| Study Materials | `study` | Reading lists, educational resources |
| Event Planning | `events` | Planning templates, checklists |
| Administrative | `admin` | Meeting minutes, bylaws, governance |

## Writing Style Guide

When writing content for the website, follow these guidelines to maintain a consistent voice.

### Tone
- **Welcoming and inclusive** — write as if speaking to a curious newcomer
- **Respectful and reverent** — treat spiritual traditions with care and dignity
- **Warm but not overly casual** — avoid slang; use clear, accessible language
- **Community-focused** — emphasize "we" and "our community" over "I"

### Earth-centered traditions terminology
- Capitalize sabbat names: Imbolc, Ostara, Beltane, Litha, Lughnasadh, Mabon, Samhain, Yule
- Use "earth-centered" (hyphenated) as an adjective, "Earthcentered" (one word) in the club name
- Avoid exclusionary terms; our community welcomes all nature-based spiritual traditions

### Formatting
- Use short paragraphs (3–5 sentences max)
- Use headings to break up long sections
- Use bulleted lists for 3+ items
- Bold key terms or important notes: `<strong>important</strong>`
- Dates: write out fully — "Saturday, September 22, 2025" not "9/22/25"
- Time: use 12-hour format with ET: "7:00 PM ET"

### Page titles
Format: `[Page Name] | Earthcentered Traditions Collective`
Example: `Events | Earthcentered Traditions Collective`

### Meta descriptions
- 150–160 characters
- Include the page topic and the club name
- Use action-oriented language
- Example: `"Explore upcoming earth-centered celebrations and community gatherings hosted by the Earthcentered Traditions Collective."`
