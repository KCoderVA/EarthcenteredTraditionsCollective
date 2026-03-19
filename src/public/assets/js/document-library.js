/**
 * @fileoverview Document library module for the Earthcentered Traditions Collective.
 * Manages search, filtering, and rendering of the members document library.
 *
 * SECURITY NOTE: This module runs in the members area. Auth check is performed
 * by auth.js — see docs/members-area.md for details.
 *
 * @module document-library
 */

'use strict';

/**
 * @typedef {Object} DocumentItem
 * @property {string} id - Unique identifier
 * @property {string} title - Document title
 * @property {string} description - Brief description
 * @property {string} category - rituals | study | events | admin
 * @property {string} fileType - PDF | DOCX | XLSX | etc.
 * @property {string} date - ISO 8601 date of last update (YYYY-MM-DD)
 * @property {string} driveUrl - Google Drive view URL
 * @property {string} icon - Emoji icon for display
 */

/**
 * Category display information.
 * @type {Record<string, { label: string, icon: string }>}
 */
const CATEGORIES = {
  rituals: { label: 'Rituals & Ceremonies', icon: '📜' },
  study: { label: 'Study Materials', icon: '📖' },
  events: { label: 'Event Planning', icon: '✅' },
  admin: { label: 'Administrative', icon: '📋' },
};

/**
 * DocumentLibrary class — manages search, filter, and rendering
 * of the document library grid.
 *
 * @example
 * const library = new DocumentLibrary(document.getElementById('library-grid'), {
 *   searchInputId: 'library-search-input',
 *   resultsCountId: 'library-results-count',
 *   emptyStateId: 'library-empty',
 * });
 * library.init();
 */
class DocumentLibrary {
  /**
   * @param {HTMLElement} container - The grid container element
   * @param {Object} [options={}] - Configuration options
   * @param {string} [options.searchInputId='library-search-input'] - ID of search input
   * @param {string} [options.resultsCountId='library-results-count'] - ID of results count element
   * @param {string} [options.emptyStateId='library-empty'] - ID of empty state element
   */
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      searchInputId: 'library-search-input',
      resultsCountId: 'library-results-count',
      emptyStateId: 'library-empty',
      clearSearchId: 'library-clear-search',
      ...options,
    };

    /** @type {string} Current active category filter */
    this.activeCategory = 'all';

    /** @type {string} Current search query */
    this.searchQuery = '';

    /** @type {HTMLElement[]} All document card elements */
    this.allCards = [];

    /** @private @type {Object} Bound event handler references for cleanup */
    this._boundHandlers = {};
  }

  /**
   * Initialize the document library.
   * Collects card references and attaches event listeners.
   *
   * @returns {DocumentLibrary} this instance for chaining
   */
  init() {
    if (!this.container) {
      console.warn('[DocumentLibrary] Container element not found.');
      return this;
    }

    this.allCards = Array.from(this.container.querySelectorAll('.document-card'));
    this._attachSearchListener();
    this._attachFilterListeners();
    this._attachClearSearchListener();
    this._updateResultsCount();

    return this;
  }

  /**
   * Set the active category filter and update the display.
   *
   * @param {string} category - Category key ('all' shows all documents)
   */
  setCategory(category) {
    this.activeCategory = category;
    this._updateDisplay();
  }

  /**
   * Set the search query and update the display.
   *
   * @param {string} query - Search string
   */
  setSearchQuery(query) {
    this.searchQuery = query.trim().toLowerCase();
    this._updateDisplay();
  }

  /**
   * Clear all filters and search query, reset to default view.
   */
  reset() {
    this.activeCategory = 'all';
    this.searchQuery = '';

    const searchInput = document.getElementById(this.options.searchInputId);

    if (searchInput) {
      searchInput.value = '';
    }

    document.querySelectorAll('.filter-btn').forEach((btn) => {
      const isAll = btn.dataset.filter === 'all';
      btn.classList.toggle('filter-btn--active', isAll);
      btn.setAttribute('aria-pressed', String(isAll));
    });

    this._updateDisplay();
  }

  /**
   * Get the number of currently visible cards.
   *
   * @returns {number} Visible card count
   */
  get visibleCount() {
    return this.allCards.filter((card) => !card.hidden).length;
  }

  /**
   * Update visibility of all cards based on current search + filter state.
   * @private
   */
  _updateDisplay() {
    this.allCards.forEach((card) => {
      const matchesCategory =
        this.activeCategory === 'all' || card.dataset.category === this.activeCategory;

      const title = (card.dataset.title || '').toLowerCase();
      const description = card.querySelector('.document-card__description')
        ? card.querySelector('.document-card__description').textContent.toLowerCase()
        : '';
      const category = (card.dataset.category || '').toLowerCase();

      const matchesSearch =
        !this.searchQuery ||
        title.includes(this.searchQuery) ||
        description.includes(this.searchQuery) ||
        category.includes(this.searchQuery);

      card.hidden = !(matchesCategory && matchesSearch);
    });

    this._updateResultsCount();
    this._updateEmptyState();
  }

  /**
   * Update the results count display.
   * @private
   */
  _updateResultsCount() {
    const countEl = document.getElementById(this.options.resultsCountId);

    if (!countEl) {
      return;
    }

    const visible = this.visibleCount;
    const total = this.allCards.length;

    if (visible === total) {
      countEl.textContent = `Showing all ${total} document${total !== 1 ? 's' : ''}`;
    } else {
      countEl.textContent = `Showing ${visible} of ${total} document${total !== 1 ? 's' : ''}`;
    }
  }

  /**
   * Show or hide the empty state element based on visible card count.
   * @private
   */
  _updateEmptyState() {
    const emptyEl = document.getElementById(this.options.emptyStateId);

    if (!emptyEl) {
      return;
    }

    emptyEl.hidden = this.visibleCount > 0;
  }

  /**
   * Attach search input listener.
   * @private
   */
  _attachSearchListener() {
    const searchInput = document.getElementById(this.options.searchInputId);

    if (!searchInput) {
      return;
    }

    this._boundHandlers.search = (e) => this.setSearchQuery(e.target.value);
    searchInput.addEventListener('input', this._boundHandlers.search);
  }

  /**
   * Attach category filter button listeners.
   * @private
   */
  _attachFilterListeners() {
    const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');

    filterBtns.forEach((btn) => {
      const handler = () => {
        this.setCategory(btn.dataset.filter);

        filterBtns.forEach((b) => {
          b.classList.remove('filter-btn--active');
          b.setAttribute('aria-pressed', 'false');
        });

        btn.classList.add('filter-btn--active');
        btn.setAttribute('aria-pressed', 'true');
      };

      btn.addEventListener('click', handler);
    });
  }

  /**
   * Attach the "clear search" button listener.
   * @private
   */
  _attachClearSearchListener() {
    const clearBtn = document.getElementById(this.options.clearSearchId);

    if (!clearBtn) {
      return;
    }

    this._boundHandlers.clearSearch = () => this.reset();
    clearBtn.addEventListener('click', this._boundHandlers.clearSearch);
  }

  /**
   * Remove all event listeners (cleanup).
   */
  destroy() {
    const searchInput = document.getElementById(this.options.searchInputId);

    if (searchInput && this._boundHandlers.search) {
      searchInput.removeEventListener('input', this._boundHandlers.search);
    }

    const clearBtn = document.getElementById(this.options.clearSearchId);

    if (clearBtn && this._boundHandlers.clearSearch) {
      clearBtn.removeEventListener('click', this._boundHandlers.clearSearch);
    }
  }
}

/**
 * Initialize the document library on pages that have the library grid.
 */
function initDocumentLibrary() {
  const grid = document.getElementById('library-grid');

  if (!grid) {
    return;
  }

  const library = new DocumentLibrary(grid);
  library.init();

  // Expose to window for debugging
  window._documentLibrary = library;
}

document.addEventListener('DOMContentLoaded', initDocumentLibrary);

export { DocumentLibrary, CATEGORIES, initDocumentLibrary };
