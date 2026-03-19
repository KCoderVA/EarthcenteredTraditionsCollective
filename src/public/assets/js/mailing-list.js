/**
 * @fileoverview Mailing list module for the Earthcentered Traditions Collective.
 * Manages the mailing list signup form, validation, and Google Forms submission.
 *
 * @module mailing-list
 */

'use strict';

/**
 * Email validation regex (RFC 5322 simplified).
 * @type {RegExp}
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate an email address.
 *
 * @param {string} email - The email address to validate
 * @returns {boolean} True if valid
 */
function isValidEmail(email) {
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Validate the mailing list signup form fields.
 *
 * @param {Object} fields - Form fields
 * @param {string} fields.firstName - Subscriber's first name
 * @param {string} fields.email - Subscriber's email address
 * @returns {{ valid: boolean, errors: Record<string, string> }} Validation result
 */
function validateSignupForm(fields) {
  const errors = {};

  if (!fields.firstName || fields.firstName.trim().length < 2) {
    errors.firstName = 'Please enter your first name (at least 2 characters).';
  }

  if (!fields.email || !isValidEmail(fields.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Display form field errors inline.
 *
 * @param {HTMLFormElement} form - The form element
 * @param {Record<string, string>} errors - Map of field names to error messages
 */
function displayFormErrors(form, errors) {
  // Clear existing errors
  form.querySelectorAll('.form-error').forEach((el) => el.remove());
  form.querySelectorAll('.form-input--error').forEach((el) => {
    el.classList.remove('form-input--error');
    el.removeAttribute('aria-describedby');
  });

  Object.entries(errors).forEach(([fieldName, message]) => {
    const input = form.querySelector(`[name="${fieldName}"]`);

    if (!input) {
      return;
    }

    const errorId = `${fieldName}-error`;
    const errorEl = document.createElement('p');
    errorEl.className = 'form-error';
    errorEl.id = errorId;
    errorEl.setAttribute('role', 'alert');
    errorEl.textContent = message;

    input.classList.add('form-input--error');
    input.setAttribute('aria-describedby', errorId);
    input.insertAdjacentElement('afterend', errorEl);
  });
}

/**
 * Set the form into a loading state.
 *
 * @param {HTMLFormElement} form - The form element
 * @param {boolean} isLoading - Whether the form is in loading state
 */
function setFormLoading(form, isLoading) {
  const submitBtn = form.querySelector('[type="submit"]');

  if (submitBtn) {
    submitBtn.disabled = isLoading;
    submitBtn.textContent = isLoading ? 'Subscribing…' : 'Subscribe';
    submitBtn.setAttribute('aria-busy', String(isLoading));
  }

  form.classList.toggle('is-loading', isLoading);
}

/**
 * Show a success or error message on the form.
 *
 * @param {HTMLElement} container - The container element to show the message in
 * @param {string} message - The message to display
 * @param {'success'|'error'} type - Message type
 */
function showFormMessage(container, message, type = 'success') {
  const existing = container.querySelector('.form-alert');

  if (existing) {
    existing.remove();
  }

  const alertEl = document.createElement('div');
  alertEl.className = `form-alert form-alert--${type}`;
  alertEl.setAttribute('role', 'alert');
  alertEl.setAttribute('aria-live', 'polite');
  alertEl.textContent = message;
  container.prepend(alertEl);

  // Scroll message into view
  alertEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Build a Google Forms pre-fill URL for mailing list signup.
 * This allows submission via iframe navigation or redirect.
 *
 * TODO(integration): Replace ENTRY_IDs with actual Google Form entry field IDs.
 * Get entry IDs by inspecting the form source or using Google Form's pre-fill link tool.
 *
 * @param {Object} fields - Form fields
 * @param {string} fields.firstName - Subscriber's first name
 * @param {string} fields.lastName - Subscriber's last name (optional)
 * @param {string} fields.email - Subscriber's email
 * @param {string} googleFormBaseUrl - The base Google Forms URL
 * @returns {string} Pre-filled Google Form URL
 */
function buildGoogleFormUrl(fields, googleFormBaseUrl) {
  const params = new URLSearchParams({
    'entry.FIRST_NAME_ENTRY_ID': fields.firstName || '',
    'entry.LAST_NAME_ENTRY_ID': fields.lastName || '',
    'entry.EMAIL_ENTRY_ID': fields.email || '',
  });

  return `${googleFormBaseUrl}?${params.toString()}&embedded=true`;
}

/**
 * Initialize native mailing list signup forms on the page.
 * Looks for forms with id="mailing-list-form" or class="mailing-list-form".
 *
 * Note: The primary signup mechanism uses an embedded Google Form iframe.
 * This handler is for optional native form fallbacks.
 */
function initMailingListForms() {
  const forms = document.querySelectorAll('#mailing-list-form, .mailing-list-form');

  forms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const firstNameInput = form.querySelector('[name="firstName"]');
      const lastNameInput = form.querySelector('[name="lastName"]');
      const emailInput = form.querySelector('[name="email"]');

      const fields = {
        firstName: firstNameInput ? firstNameInput.value : '',
        lastName: lastNameInput ? lastNameInput.value : '',
        email: emailInput ? emailInput.value : '',
      };

      const { valid, errors } = validateSignupForm(fields);

      if (!valid) {
        displayFormErrors(form, errors);

        // Focus first errored field
        const firstError = form.querySelector('.form-input--error');

        if (firstError) {
          firstError.focus();
        }

        return;
      }

      setFormLoading(form, true);

      try {
        // TODO(integration): Submit to Google Forms or a backend endpoint
        // For now, simulate success after a brief delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        form.reset();
        showFormMessage(
          form.parentElement || form,
          "You've been subscribed! Thank you for joining our community. 🌿",
          'success'
        );
        form.hidden = true;
      } catch (_err) {
        showFormMessage(
          form.parentElement || form,
          'Something went wrong. Please try again or contact us directly.',
          'error'
        );
      } finally {
        setFormLoading(form, false);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initMailingListForms);

export {
  isValidEmail,
  validateSignupForm,
  displayFormErrors,
  setFormLoading,
  showFormMessage,
  buildGoogleFormUrl,
  initMailingListForms,
};
