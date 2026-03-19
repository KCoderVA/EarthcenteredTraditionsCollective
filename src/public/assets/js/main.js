/**
 * @fileoverview Main JavaScript entry point for Earthcentered Traditions Collective.
 * Handles global UI interactions: navigation, smooth scroll, lazy loading,
 * active link highlighting, and accordion initialization.
 *
 * @module main
 */

'use strict';

/**
 * Initialize the mobile navigation toggle.
 */
function initNavToggle() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');

  if (!toggle || !menu) {
    return;
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    menu.classList.toggle('is-open', !isOpen);
  });

  // Close menu when a nav link is clicked (mobile UX)
  menu.querySelectorAll('.site-nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
      menu.classList.remove('is-open');
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      toggle.focus();
    }
  });
}

/**
 * Highlight the current page's nav link by matching the URL pathname.
 */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.site-nav__link');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');

    if (!href) {
      return;
    }

    // Normalize paths for comparison
    const linkPath = new URL(href, window.location.origin).pathname;
    const isHome = currentPath === '/' && (href === '/' || href === '/index.html');
    const isExactMatch = linkPath === currentPath;
    const isParentMatch =
      linkPath !== '/' && currentPath.startsWith(linkPath) && linkPath.length > 1;

    if (isHome || isExactMatch || isParentMatch) {
      link.setAttribute('aria-current', 'page');
      link.classList.add('site-nav__link--active');
    }
  });
}

/**
 * Initialize accordion components with keyboard accessibility.
 */
function initAccordions() {
  const accordions = document.querySelectorAll('.accordion');

  accordions.forEach((accordion) => {
    const triggers = accordion.querySelectorAll('.accordion__trigger');

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        const panelId = trigger.getAttribute('aria-controls');
        const panel = document.getElementById(panelId);

        if (!panel) {
          return;
        }

        trigger.setAttribute('aria-expanded', String(!isExpanded));
        panel.hidden = isExpanded;
      });
    });
  });
}

/**
 * Initialize event card filter buttons.
 * Filters the events grid based on data-category attributes.
 */
function initEventFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  const eventCards = document.querySelectorAll('.event-card[data-category]');

  if (!filterBtns.length || !eventCards.length) {
    return;
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update button states
      filterBtns.forEach((b) => {
        b.classList.remove('filter-btn--active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('filter-btn--active');
      btn.setAttribute('aria-pressed', 'true');

      // Filter cards
      eventCards.forEach((card) => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;
        card.hidden = !show;
      });
    });
  });
}

/**
 * Lazily load images using the IntersectionObserver API.
 * Images with data-src attributes will be loaded when they enter the viewport.
 */
function initLazyImages() {
  const lazyImages = document.querySelectorAll('img[data-src]');

  if (!lazyImages.length) {
    return;
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: '200px' }
    );

    lazyImages.forEach((img) => observer.observe(img));
  } else {
    // Fallback: load all images immediately
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

/**
 * Initialize smooth scroll for anchor links.
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);

      if (!targetId) {
        return;
      }

      const target = document.getElementById(targetId);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Move focus to target for accessibility
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  });
}

/**
 * Bootstrap all modules when DOM is ready.
 */
document.addEventListener('DOMContentLoaded', () => {
  initNavToggle();
  highlightActiveNavLink();
  initAccordions();
  initEventFilters();
  initLazyImages();
  initSmoothScroll();
});
