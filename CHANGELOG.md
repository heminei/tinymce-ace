# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog.

## [2.0.0] - 2026-06-02

### Added

- Added a local runnable example page at `example/index.html`.
- Added a custom ACE icon for the TinyMCE `ace` button and menu item.
- Added tooltip support for the ACE toolbar button (`ACE Editor`).
- Added more common language modes in the dialog:
  - `typescript`, `jsx`, `tsx`, `python`, `bash`
  - `xml`, `markdown`, `yaml`, `dockerfile`
  - `c_cpp`, `csharp`, `go`, `rust`, `ruby`

### Changed

- Updated dialog layout classes to Bootstrap 5 compatible classes.
- Updated plugin initialization to avoid strict-mode `this` usage.
- Switched plugin dialog opening to `editor.windowManager.openUrl(...)`.
- Switched plugin path handling to use TinyMCE plugin `url` parameter.
- Replaced jQuery usage with native JavaScript in dialog logic and plugin logic.
- Expanded project documentation in `README.md` with installation, usage, example, and structure sections.

### Fixed

- Fixed plugin startup error:
  - `TypeError: Cannot set properties of undefined (setting 'escapePreHtml')`
- Kept insert/edit flow stable for existing `pre.ace-editor` blocks after native JS migration.

### Removed

- Removed `jquery` dependency from `package.json` and `package-lock.json`.
