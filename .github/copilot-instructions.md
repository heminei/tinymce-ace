# Copilot Instructions for tinymce-ace

## Project Overview

- This repository contains a TinyMCE plugin named `ace` that opens an ACE editor dialog for inserting and editing code blocks.
- The plugin stores code blocks in TinyMCE content as `<pre class="ace-editor" ...>` elements.
- The project is plain JavaScript, HTML, and CSS with no bundler and no transpilation.

## Key Files

- `src/plugin.js`: TinyMCE plugin registration, dialog lifecycle, and conversion between dialog data and `<pre>` content.
- `src/dialog.html`: Dialog UI and ACE editor setup. Handles postMessage communication with TinyMCE dialog APIs.
- `src/style.css`: Styling for rendered `.ace-editor` blocks inside editor content.
- `package.json`: Metadata and runtime dependencies only.

## Coding Conventions

- Preserve existing style: ES5-style `var`, function expressions, and semicolon usage as currently present.
- Keep dependencies and runtime assumptions unchanged unless explicitly requested.
- Prefer minimal, targeted edits and avoid broad refactors.
- Maintain TinyMCE plugin behavior and message names (`init`, `save`) unless a task requires protocol changes.

## Behavioral Requirements

- Continue escaping code content before writing to `<pre>` tags (`<` and `>` replacement) to avoid HTML rendering issues.
- Keep `data-ace-mode`, `data-ace-width`, and `data-ace-height` attributes in sync between dialog and inserted/edited blocks.
- Keep `contenteditable="false"` on inserted `<pre class="ace-editor">` blocks.
- Preserve support for both insert flow and edit flow (double-click existing `.ace-editor` block).

## UI and Integration Notes

- `src/dialog.html` currently depends on direct `/node_modules/...` asset paths.
- If changing dialog behavior, ensure message flow still works:
    1. Dialog sends `init` request to parent.
    2. Parent responds with initial data.
    3. Parent button action sends `save` trigger to dialog.
    4. Dialog posts `save` payload back to parent.

## Validation Checklist for Changes

- Plugin button and menu item still open the ACE dialog.
- Double-click on existing `.ace-editor` block opens edit mode with current values prefilled.
- Saving updates or inserts a `<pre class="ace-editor">` block with correct attributes and dimensions.
- Editor mode changes update ACE session mode.
- Width/height changes resize ACE editor correctly.

## Out of Scope Unless Requested

- Migrating to modern build tooling.
- Rewriting to TypeScript or modern module syntax.
- Replacing TinyMCE dialog API patterns used in this repository.
