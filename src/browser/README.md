# Browser-Ready Components

This directory contains components and utilities for using WP-Builder in a browser environment without requiring a full React application.

## Overview

The browser-ready implementation allows you to:

1. Use WP-Builder components in any website by including the bundled JS and CSS files
2. Attach form components to existing HTML elements
3. Isolate styles to prevent conflicts with the host website

## Key Files

- **index.js**: Main entry point that exports the `attachForm` and `attachToForm` functions
- **FormComponent.js**: React component that renders the JSONForms with Gutenberg renderers
- **demo.html**: Example implementation showing how to use the components
- **style.scss** and **form-style.scss**: Isolated styles for the components
- **core.js** and **core.scss**: Core styles and dependencies

## Usage

Include the necessary files in your HTML:

```html
<!-- React dependencies -->
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- WP Builder styles -->
<link rel="stylesheet" href="/build-browser/core.css">
<link rel="stylesheet" href="/build-browser/wp-builder.css">
<link rel="stylesheet" href="/build-browser/wordpress-components.css">

<!-- WP Builder scripts -->
<script src="/build-browser/wordpress-components.js"></script>
<script src="/build-browser/wp-builder.js"></script>
```

Then use the global `wpBuilder` object to attach forms:

```javascript
// Attach to a container element
wpBuilder.attachForm(document.getElementById('form-container'), {
  onChange: (data) => {
    console.log('Form data:', data);
  }
});
```

## Development

Run the browser demo with:

```bash
npm run start:browser-demo
```

This will build the browser files, copy the demo HTML, and start a development server with HTTPS support.
