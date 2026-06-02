# tinymce-ace

TinyMCE plugin that opens an ACE editor dialog for inserting and editing code blocks.

## Features

- Insert code blocks from the TinyMCE toolbar or Insert menu.
- Edit existing code blocks by double-clicking a rendered block.
- Stores blocks as `pre.ace-editor` with mode, width, and height metadata.
- Uses Bootstrap 5 for dialog layout.
- Uses native JavaScript (no jQuery dependency).

## Installation

1. Install dependencies:

```bash
npm install
```

## Usage

Load TinyMCE and register the external plugin path to `src/plugin.js`.

```html
<script src="/node_modules/tinymce/tinymce.min.js"></script>
<script>
    tinymce.init({
        selector: '#editor',
        license_key: 'gpl',
        plugins: 'code ace',
        toolbar: 'undo redo | blocks | bold italic | ace code',
        external_plugins: {
            ace: '/src/plugin.js'
        }
    });
</script>
```

## Example Page

An example page is included at `example/index.html`.

1. Start a local server from repository root:

```bash
npx serve .
```

1. Open:

`/example/index.html`

## Generated Markup

On save, the plugin inserts or updates markup similar to:

```html
<pre class="ace-editor"
    data-ace-mode="html"
    data-ace-width="100%"
    data-ace-height="200px"
    contenteditable="false"
    style="width: 100%; height: 200px;">...escaped code...</pre>
<p></p>
```

## Project Structure

- `src/plugin.js` TinyMCE plugin registration and dialog message handling.
- `src/dialog.html` ACE dialog UI and editor integration.
- `src/style.css` Rendering styles for `.ace-editor` blocks in editor content.
- `example/index.html` Local runnable example.
