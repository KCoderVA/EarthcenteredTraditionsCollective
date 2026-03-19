# Integrations Documentation

## Google Forms

Google Forms is used for all data collection on the website. No custom backend is required.

### Active forms

| Form | Used on | Purpose |
|------|---------|---------|
| Contact Us | `contact.html` | General inquiries |
| Mailing List Signup | `index.html` | Newsletter subscription |
| Event RSVP | `events.html`, `members/calendar.html` | Event attendance |

### Embedding a Google Form

1. Open your form in Google Forms
2. Click the **Send** button → **< >** (Embed) tab
3. Copy the `<iframe>` code
4. Paste into the HTML page, replacing `width` and `height` with CSS classes
5. Add a `title` attribute to the iframe for accessibility
6. Add `loading="lazy"` to the iframe

**Standard embed pattern:**
```html
<div class="form-embed-wrapper">
  <iframe
    src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
    title="Contact Form — Earthcentered Traditions Collective"
    class="form-embed"
    frameborder="0"
    marginheight="0"
    marginwidth="0"
    loading="lazy"
  >
    Loading form…
    <a href="https://forms.gle/YOUR_FORM_ID" target="_blank" rel="noopener noreferrer">
      Open form in new tab
    </a>
  </iframe>
</div>
```

### CSP configuration

Google Forms iframes require this in the page's Content Security Policy meta tag:
```
frame-src https://docs.google.com https://forms.gle;
```

### Collecting responses

- Open Google Forms → **Responses** tab to see submissions
- Click the Google Sheets icon to create a linked spreadsheet for easier management
- Enable email notifications: Responses → "•••" → Get email notifications for new responses

### Creating a new form

1. Go to [forms.google.com](https://forms.google.com)
2. Create form with relevant fields
3. In **Settings → Responses**: Enable "Collect email addresses" if needed
4. In **Settings → Presentation**: Add a confirmation message
5. Test the form before embedding
6. Update the relevant HTML file with the new embed code

---

## Google Calendar

Google Calendar displays upcoming events on the public events page and the members calendar page.

### Calendar embeds

Public calendar embed (`events.html`):
```html
<iframe
  src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&ctz=America%2FNew_York&mode=AGENDA&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=0&showCalendars=0&showTz=1"
  title="Earthcentered Traditions Collective Event Calendar"
  class="calendar-embed__iframe"
  frameborder="0"
  scrolling="no"
  loading="lazy"
></iframe>
```

### CSP configuration

Google Calendar iframes require:
```
frame-src https://calendar.google.com;
```

### Managing calendar events

1. Log in to the Google account associated with the club calendar
2. Create events with full details: title, date, time, location, description
3. Add RSVP form links in the event description
4. For members-only events: mark them in the event title or description; consider a separate private calendar

### Getting your Calendar ID

1. Open [calendar.google.com](https://calendar.google.com)
2. In the left sidebar, hover over your calendar → click **⋮** → **Settings and sharing**
3. Scroll to "Integrate calendar" → copy the **Calendar ID**
4. URL-encode it for the `src` parameter (replace `@` with `%40`)

---

## Mailing List

The mailing list uses Google Forms + Google Sheets for a simple, no-cost solution.

### Setup

1. Create a Google Form with fields: First Name, Last Name, Email Address, Interests (checkboxes)
2. Link it to a Google Sheet for subscriber management
3. Embed the form on `index.html` in the "Stay Connected" section

### Sending newsletters

Options for sending emails to the list:
1. **Gmail + Google Sheets** (free, up to 500/day): Use [Yet Another Mail Merge](https://yamm.com/) or similar
2. **Mailchimp** (free up to 500 contacts): Import the Sheets CSV, use Mailchimp's editor
3. **Google Groups**: Create a Google Group and add members — members can email the group address

### Unsubscribes

Include an unsubscribe option in every email. For manual list management:
- Add an "Unsubscribe" Google Form
- Respond to unsubscribe requests promptly
- Remove the subscriber from the Google Sheet

---

## Future API Integrations

These integrations are planned for future development:

| Integration | Purpose | Status |
|-------------|---------|--------|
| Google OAuth 2.0 | Replace localStorage auth for members area | Planned v1.0 |
| Google Drive API | Dynamic document library from Drive folder | Planned v1.0 |
| Google Sheets API | Live event RSVP counts | Future |
| SendGrid / Mailgun | Transactional email (event confirmations) | Future |
| PayPal / Stripe | Event registration fees (if needed) | Future |

For OAuth implementation notes, see [members-area.md](./members-area.md).
