#!/usr/bin/env node
/**
 * @fileoverview HTML validation script for Earthcentered Traditions Collective.
 * Validates all HTML files in src/public/ using html-validate.
 *
 * Usage: node scripts/validate-html.js
 */

'use strict';

const { HtmlValidate } = require('html-validate');
const fs = require('fs');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, '../src/public');

/**
 * Recursively find all .html files in a directory.
 *
 * @param {string} dir - Directory to search
 * @returns {string[]} Array of absolute file paths
 */
function findHtmlFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...findHtmlFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }

  return results;
}

async function main() {
  const htmlValidate = new HtmlValidate();
  const htmlFiles = findHtmlFiles(SRC_DIR);
  let hasErrors = false;
  let totalErrors = 0;
  let totalWarnings = 0;

  console.log(`[validate-html] Validating ${htmlFiles.length} HTML file(s)…\n`);

  for (const filePath of htmlFiles) {
    const relativePath = path.relative(process.cwd(), filePath);
    const source = fs.readFileSync(filePath, 'utf8');

    const report = await htmlValidate.validateString(source, filePath);

    if (!report.valid) {
      hasErrors = true;
      console.error(`❌ ${relativePath}`);

      for (const message of report.results[0]?.messages || []) {
        const type = message.severity === 2 ? 'error' : 'warning';
        const icon = type === 'error' ? '  🔴' : '  🟡';

        if (type === 'error') {
          totalErrors++;
        } else {
          totalWarnings++;
        }

        console.error(
          `${icon} [${type}] Line ${message.line}:${message.column} — ${message.message} (${message.ruleId})`
        );
      }

      console.error('');
    } else {
      console.log(`✅ ${relativePath}`);
    }
  }

  console.log(
    `\n[validate-html] Done. ${totalErrors} error(s), ${totalWarnings} warning(s) across ${htmlFiles.length} file(s).`
  );

  if (hasErrors) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('[validate-html] Unexpected error:', err);
  process.exit(1);
});
