/**
 * @fileoverview Events module for the Earthcentered Traditions Collective website.
 * Manages event data, rendering, filtering, and RSVP interactions.
 *
 * @module events
 */

'use strict';

/**
 * @typedef {Object} EventData
 * @property {string} id - Unique kebab-case slug
 * @property {string} title - Full event title
 * @property {string} shortTitle - Short title for cards (≤30 chars)
 * @property {string} date - ISO 8601 date string (YYYY-MM-DD)
 * @property {string} time - Human-readable time string
 * @property {string} location - Venue name and/or address
 * @property {boolean} isOnline - True if event is online or hybrid
 * @property {string} description - Full description text
 * @property {string} shortDescription - 1-2 sentence summary for cards
 * @property {string} category - sabbat | esbat | study-circle | social | workshop | other
 * @property {boolean} membersOnly - True if restricted to authenticated members
 * @property {string|null} rsvpFormUrl - Google Form URL for RSVP, or null
 * @property {string|null} imageUrl - Path to event image, or null
 * @property {string[]} tags - Array of topic/keyword tags
 */

/**
 * Mock event data for the current season.
 * TODO(backend): Replace with API call to fetch events from Google Sheets or backend.
 *
 * @type {EventData[]}
 */
const EVENTS_DATA = [
  {
    id: 'samhain-2025',
    title: 'Samhain Gathering 2025',
    shortTitle: 'Samhain Gathering',
    date: '2025-10-31',
    time: '7:00 PM – 10:30 PM ET',
    location: 'Riverside Community Center, Hall B',
    isOnline: false,
    description:
      'Join us for our annual Samhain celebration as we honor the thinning of the veil between worlds. Remembrance ceremony, communal divination, seasonal food and drink, and a closing ritual circle.',
    shortDescription:
      'Honor the thinning veil with our annual Samhain circle — remembrance, divination, and community.',
    category: 'sabbat',
    membersOnly: false,
    rsvpFormUrl: 'https://forms.gle/YOUR_SAMHAIN_RSVP_FORM',
    imageUrl: null,
    tags: ['samhain', 'halloween', 'divination', 'remembrance'],
  },
  {
    id: 'full-moon-nov-2025',
    title: 'Full Moon Circle — November',
    shortTitle: 'Full Moon Circle',
    date: '2025-11-05',
    time: '8:00 PM – 9:30 PM ET',
    location: 'Creekside Meadow — meet at the parking area',
    isOnline: false,
    description:
      'Monthly outdoor full moon circle. Bring a blanket and something to offer at the altar. Weather permitting — check our newsletter for weather updates.',
    shortDescription: 'Monthly outdoor full moon circle. Bring a blanket and something to offer.',
    category: 'esbat',
    membersOnly: false,
    rsvpFormUrl: 'https://forms.gle/YOUR_ESBAT_RSVP_FORM',
    imageUrl: null,
    tags: ['full-moon', 'esbat', 'outdoor', 'circle'],
  },
  {
    id: 'study-circle-nov-2025',
    title: 'November Study Circle',
    shortTitle: 'Study Circle: Nov',
    date: '2025-11-15',
    time: '2:00 PM – 4:30 PM ET',
    location: 'Main Street Library, Meeting Room 2',
    isOnline: false,
    description:
      "Monthly gathering for shared reading and discussion. This month's topic: mythology and folklore of the winter season across earth-centered traditions.",
    shortDescription: 'Monthly study circle. Topic: winter mythology and folklore across traditions.',
    category: 'study-circle',
    membersOnly: false,
    rsvpFormUrl: 'https://forms.gle/YOUR_STUDY_RSVP_FORM',
    imageUrl: null,
    tags: ['study', 'mythology', 'folklore', 'winter', 'reading'],
  },
  {
    id: 'yule-2025',
    title: 'Yule — Winter Solstice Gathering',
    shortTitle: 'Yule Gathering',
    date: '2025-12-21',
    time: '6:00 PM – 9:30 PM ET',
    location: 'Community Hall, Pine Room',
    isOnline: false,
    description:
      'Celebrate the return of the light with our Yule gathering. Includes a candle ceremony, wassail, seasonal songs, and a Yule log ritual. Potluck-style — please bring a dish to share.',
    shortDescription:
      'Celebrate the return of the light with candle ceremony, wassail, and seasonal songs.',
    category: 'sabbat',
    membersOnly: false,
    rsvpFormUrl: 'https://forms.gle/YOUR_YULE_RSVP_FORM',
    imageUrl: null,
    tags: ['yule', 'winter-solstice', 'candle', 'wassail', 'potluck'],
  },
  {
    id: 'imbolc-2026',
    title: 'Imbolc Celebration',
    shortTitle: 'Imbolc',
    date: '2026-02-01',
    time: '4:00 PM – 7:00 PM ET',
    location: 'Riverside Community Center, Hall A',
    isOnline: false,
    description:
      "Mark the stirring of spring with our Imbolc gathering. We'll create Brigid's crosses, light candles for the return of warmth, and share in a potluck feast.",
    shortDescription: "Celebrate the stirring of spring — Brigid's crosses, candles, and potluck.",
    category: 'sabbat',
    membersOnly: false,
    rsvpFormUrl: null,
    imageUrl: null,
    tags: ['imbolc', 'brigid', 'spring', 'candles'],
  },
];

/**
 * Category display labels.
 * @type {Record<string, string>}
 */
const CATEGORY_LABELS = {
  sabbat: 'Sabbat',
  esbat: 'Esbat',
  'study-circle': 'Study Circle',
  social: 'Social',
  workshop: 'Workshop',
  other: 'Event',
};

/**
 * Format an ISO date string to a human-readable format.
 *
 * @param {string} isoDate - ISO 8601 date string (YYYY-MM-DD)
 * @param {Intl.DateTimeFormatOptions} [options] - Custom Intl options
 * @returns {string} Formatted date string
 */
function formatDate(isoDate, options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) {
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString('en-US', options);
}

/**
 * Get the abbreviated month name for a date.
 *
 * @param {string} isoDate - ISO 8601 date string
 * @returns {string} Three-letter month abbreviation (e.g., 'Oct')
 */
function getMonthAbbrev(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString('en-US', { month: 'short' });
}

/**
 * Get the day of month for a date.
 *
 * @param {string} isoDate - ISO 8601 date string
 * @returns {string} Day of month as a string (e.g., '31')
 */
function getDayOfMonth(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`);
  return String(date.getDate());
}

/**
 * Filter events by category.
 *
 * @param {EventData[]} events - Array of events to filter
 * @param {string} category - Category to filter by ('all' returns all events)
 * @returns {EventData[]} Filtered events
 */
function filterEventsByCategory(events, category) {
  if (category === 'all') {
    return events;
  }
  return events.filter((event) => event.category === category);
}

/**
 * Sort events by date (ascending).
 *
 * @param {EventData[]} events - Array of events to sort
 * @returns {EventData[]} Sorted events (soonest first)
 */
function sortEventsByDate(events) {
  return [...events].sort((a, b) => new Date(a.date) - new Date(b.date));
}

/**
 * Get only upcoming events (today or later).
 *
 * @param {EventData[]} events - Array of events to filter
 * @returns {EventData[]} Upcoming events
 */
function getUpcomingEvents(events) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return events.filter((event) => new Date(`${event.date}T00:00:00`) >= today);
}

/**
 * EventCard class — renders and manages a single event card DOM element.
 *
 * @example
 * const card = new EventCard(eventData);
 * document.getElementById('events-grid').appendChild(card.render());
 */
class EventCard {
  /**
   * @param {EventData} eventData - The event data object
   */
  constructor(eventData) {
    this.event = eventData;
    this.element = null;
  }

  /**
   * Render the event card as a DOM element.
   *
   * @returns {HTMLElement} The rendered article element
   */
  render() {
    const { id, title, date, time, location, shortDescription, category, rsvpFormUrl, membersOnly } =
      this.event;

    const article = document.createElement('article');
    article.className = 'event-card';
    article.setAttribute('role', 'listitem');
    article.setAttribute('data-event-id', id);
    article.setAttribute('data-category', category);

    if (membersOnly) {
      article.setAttribute('data-members-only', 'true');
    }

    const categoryLabel = CATEGORY_LABELS[category] || 'Event';
    const monthAbbrev = getMonthAbbrev(date);
    const day = getDayOfMonth(date);
    const formattedDate = formatDate(date);

    // Build RSVP button — only if there's a form URL
    const rsvpHtml = rsvpFormUrl
      ? `<a href="${rsvpFormUrl}" class="btn btn--primary btn--sm event-card__rsvp-btn"
           target="_blank" rel="noopener noreferrer"
           aria-label="RSVP for ${title}">RSVP</a>`
      : '';

    article.innerHTML = `
      <div class="event-card__date-badge" aria-hidden="true">
        <span class="event-card__month">${monthAbbrev}</span>
        <span class="event-card__day">${day}</span>
      </div>
      <div class="event-card__body">
        <span class="event-card__category-tag">${categoryLabel}</span>
        <h3 class="event-card__title">${title}</h3>
        <p class="event-card__meta">
          <time datetime="${date}">${formattedDate} · ${time}</time>
          · ${location}
        </p>
        <p class="event-card__description">${shortDescription}</p>
      </div>
      <div class="event-card__actions">
        ${rsvpHtml}
        <a href="#${id}" class="btn btn--ghost btn--sm">Details</a>
      </div>
    `;

    this.element = article;
    return article;
  }
}

export {
  EVENTS_DATA,
  CATEGORY_LABELS,
  EventCard,
  formatDate,
  getMonthAbbrev,
  getDayOfMonth,
  filterEventsByCategory,
  sortEventsByDate,
  getUpcomingEvents,
};
