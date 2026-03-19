#!/usr/bin/env node
/**
 * @fileoverview Post-install hook setup for Earthcentered Traditions Collective.
 * Copies hooks/pre-commit to .git/hooks/pre-commit and makes it executable.
 *
 * Runs automatically via the "postinstall" npm script.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

const REPO_ROOT = path.resolve(__dirname, '..');
const HOOK_SRC = path.join(REPO_ROOT, 'hooks', 'pre-commit');
const GIT_HOOKS_DIR = path.join(REPO_ROOT, '.git', 'hooks');
const HOOK_DEST = path.join(GIT_HOOKS_DIR, 'pre-commit');

function main() {
  // Skip if not in a git repository (e.g., CI environment)
  if (!fs.existsSync(path.join(REPO_ROOT, '.git'))) {
    console.log('[setup-hooks] Not a git repository — skipping hook installation.');
    return;
  }

  // Skip if source hook doesn't exist
  if (!fs.existsSync(HOOK_SRC)) {
    console.warn(`[setup-hooks] Source hook not found: ${HOOK_SRC}`);
    return;
  }

  // Ensure .git/hooks directory exists
  if (!fs.existsSync(GIT_HOOKS_DIR)) {
    fs.mkdirSync(GIT_HOOKS_DIR, { recursive: true });
  }

  try {
    fs.copyFileSync(HOOK_SRC, HOOK_DEST);

    // Make executable on Unix-like systems
    if (os.platform() !== 'win32') {
      fs.chmodSync(HOOK_DEST, 0o755);
    }

    console.log('[setup-hooks] ✅ Pre-commit hook installed at .git/hooks/pre-commit');
  } catch (err) {
    console.warn(`[setup-hooks] Could not install pre-commit hook: ${err.message}`);
    // Non-fatal: don't block npm install
  }
}

main();
