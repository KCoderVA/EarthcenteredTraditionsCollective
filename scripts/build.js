#!/usr/bin/env node
/**
 * @fileoverview Build script for Earthcentered Traditions Collective.
 * Copies src/public/ to dist/, injects HTML components, and prepares
 * the site for deployment to GitHub Pages.
 *
 * Usage: node scripts/build.js
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ============================================================
// Configuration
// ============================================================

const SRC_DIR = path.resolve(__dirname, '../src/public');
const DIST_DIR = path.resolve(__dirname, '../dist');
const COMPONENTS_DIR = path.join(SRC_DIR, 'components');

/** Component injection markers and their source files. */
const COMPONENT_INCLUDES = {
  '<!-- INCLUDE:nav -->': path.join(COMPONENTS_DIR, 'nav.html'),
  '<!-- INCLUDE:footer -->': path.join(COMPONENTS_DIR, 'footer.html'),
};

// ============================================================
// Utilities
// ============================================================

/**
 * Recursively copy a directory from src to dest.
 *
 * @param {string} src - Source directory path
 * @param {string} dest - Destination directory path
 */
function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Recursively find all files matching a pattern in a directory.
 *
 * @param {string} dir - Directory to search
 * @param {RegExp} pattern - File name pattern to match
 * @returns {string[]} Array of absolute file paths
 */
function findFiles(dir, pattern) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...findFiles(fullPath, pattern));
    } else if (pattern.test(entry.name)) {
      results.push(fullPath);
    }
  }

  return results;
}

/**
 * Load component HTML content, caching the results.
 *
 * @returns {Record<string, string>} Map of include marker to component HTML
 */
function loadComponents() {
  const components = {};

  for (const [marker, filePath] of Object.entries(COMPONENT_INCLUDES)) {
    if (fs.existsSync(filePath)) {
      components[marker] = fs.readFileSync(filePath, 'utf8');
    } else {
      console.warn(`[build] Warning: Component file not found: ${filePath}`);
      components[marker] = `<!-- Component not found: ${filePath} -->`;
    }
  }

  return components;
}

/**
 * Inject component HTML into a page's HTML content.
 *
 * @param {string} html - Original HTML content
 * @param {Record<string, string>} components - Map of marker to HTML
 * @returns {string} HTML with components injected
 */
function injectComponents(html, components) {
  let result = html;

  for (const [marker, componentHtml] of Object.entries(components)) {
    result = result.replaceAll(marker, componentHtml);
  }

  return result;
}

// ============================================================
// Build Steps
// ============================================================

/**
 * Step 1: Clean the dist directory.
 */
function cleanDist() {
  if (fs.existsSync(DIST_DIR)) {
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
    console.log('[build] Cleaned dist/');
  }
}

/**
 * Step 2: Copy all source files to dist.
 */
function copySrc() {
  copyDirRecursive(SRC_DIR, DIST_DIR);
  console.log(`[build] Copied src/public/ → dist/`);
}

/**
 * Step 3: Inject HTML components into all HTML files in dist.
 */
function injectHtmlComponents() {
  const components = loadComponents();
  const htmlFiles = findFiles(DIST_DIR, /\.html$/);
  let count = 0;

  for (const filePath of htmlFiles) {
    const original = fs.readFileSync(filePath, 'utf8');
    const injected = injectComponents(original, components);

    if (injected !== original) {
      fs.writeFileSync(filePath, injected, 'utf8');
      count++;
    }
  }

  console.log(`[build] Injected components into ${count} HTML file(s)`);
}

/**
 * Step 4: Add a .nojekyll file so GitHub Pages doesn't process the site.
 */
function addNoJekyll() {
  const noJekyllPath = path.join(DIST_DIR, '.nojekyll');
  fs.writeFileSync(noJekyllPath, '', 'utf8');
  console.log('[build] Added .nojekyll');
}

// ============================================================
// Main
// ============================================================

function main() {
  const startTime = Date.now();
  console.log('[build] Starting build…\n');

  try {
    cleanDist();
    copySrc();
    injectHtmlComponents();
    addNoJekyll();

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n[build] ✅ Build complete in ${elapsed}s → dist/`);
  } catch (err) {
    console.error('[build] ❌ Build failed:', err.message);
    process.exit(1);
  }
}

main();
