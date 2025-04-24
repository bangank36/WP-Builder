# WP-Builder
JSON Schema-based forms with Wordpress Components renderer

## Roadmap
The goal of this project is to replace all controls in @jsonforms/material-renderers into @wordpress/components to take advantage of the full set of [custom controls](https://jsonforms.io/docs/renderer-sets/) such as: duotone picker, datetime picker...

[Project view](https://github.com/users/bangank36/projects/1/views/5)

Introduce the new Layout to display the nested object/array properties into `disclosure` views, bring the app-like UI for the generated forms ( eg: your android phone Settings screen )

### JSON Schema Features

|JSON Schema|Renderer|React Material|Gutenberg|
|:----|:----|:----|:----|
|boolean|Checkbox| ✅ | https://github.com/bangank36/WP-Builder/issues/14 |
| |Toggle|✅| https://github.com/bangank36/WP-Builder/issues/14 |
|integer|Number|✅| |
| |Text|❌| |
|String|Text|✅| https://github.com/bangank36/WP-Builder/issues/4 |
| |Textarea|✅| https://github.com/bangank36/WP-Builder/issues/6 |
| |[ColorPalette](https://wordpress.github.io/gutenberg/?path=/docs/components-colorpalette--default)|✅| https://github.com/bangank36/WP-Builder/issues/8 |
|Enum|[ToggleGroup](https://wordpress.github.io/gutenberg/?path=/docs/components-experimental-togglegroupcontrol--default)|✅| https://github.com/bangank36/WP-Builder/issues/40 |

### Disclosure Screens
Brought to jsonforms by a new `NavigatorLayout` which will render a whole set of `NavigatorScreen` by rendering the deep nested node into its own `Screen`, in other words: all the object/array nested nodes will be rendered in `flat` structure instead of `nested`.
By default, nested nodes will render `JsonFormDispatch` components, but with the new Layout, they will only render a `NavigatorButton` and pass their `JsonFormDispatch` to root node via Context.
Development notes can be found in these issues

|Issue/PR|Notes|
|:----|:----|
| [🖍️ WP-Builder: Integrate Form builder with Gutenberg Navigator](https://github.com/bangank36/WP-Builder/issues/17) ||
| [🖍️ WP-Builder: with or within jsonforms](https://github.com/bangank36/WP-Builder/issues/24) ||
| [WP-Builder: Introduce new NavigatorLayout #19](https://github.com/bangank36/WP-Builder/issues/19) ||

## Development Scripts

This project provides several scripts for development:

### Main Scripts

- `npm start` - Starts the combined development environment with both the main app and browser demo available
  - Main app: http://localhost:3000/
  - Browser demo: http://localhost:3000/demo-browser/

### Other Available Scripts

- `npm run start:app` - Starts only the main React application
- `npm run start:browser-demo` - Builds and starts only the browser demo
- `npm run dev:browser-demo` - Starts the browser demo with file watching for development
- `npm run dev:combined` - Starts the combined environment with file watching for both the main app and browser demo
- `npm run start:https` - Starts the development server with HTTPS support
- `npm run start:combined` - Builds the browser files and starts the combined environment (without watching)

### Build Scripts

- `npm run build` - Builds the main application for development
- `npm run build:browser` - Builds the browser-ready files for production
- `npm run build:browser:dev` - Builds the browser-ready files for development

### Development Workflow

The recommended workflow is to use `npm start` which will:

1. Create SSL certificates if needed
2. Copy the demo HTML files to the appropriate locations
3. Start the webpack-dev-server for the main app
4. Watch for changes in the browser files and rebuild them automatically
5. Watch for changes in the demo HTML files and copy them automatically

This allows you to develop both the main app and the browser demo simultaneously without having to restart the server.

#### Browser Tabs

The development server will not automatically open browser tabs when files change. You can manually open the following URLs in your browser:

- Main app: https://localhost:3000/
- Browser demo: https://localhost:3000/demo-browser/

Both will hot-reload when their respective files change.

## Browser Demo

The browser demo is available at:
- Development mode: http://localhost:3000/demo-browser/
- Production build: Copy the contents of the `build-browser` directory to your server

## HTTPS Support

For HTTPS support, the application will automatically generate self-signed certificates in the `certs` directory. You may need to add these certificates to your trusted certificates for your browser to accept them.

## Contributing
Are very welcome!! Please open new issues, PRs about anything relevant to this project scope and we can have a look together!
