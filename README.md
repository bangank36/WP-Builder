# WP-Builder
JSON Schema-based forms with Wordpress Components renderer

## Roadmap
The goal of this project is to replace all controls in @jsonforms/material-renderers into @wordpress/components to take advantage of the full set of [custom controls](https://jsonforms.io/docs/renderer-sets/) such as: duotone picker, datetime picker...
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

### Disclosure Screens
Brought to jsonforms by a new `NavigatorLayout` which will render a whole set of `NavigatorScreen` by rendering the deep nested node into its own `Screen`, in other words: all the object/array nested nodes will be rendered in `flat` structure instead of `nested`.
By default, nested nodes will render `JsonFormDispatch` components, but with the new Layout, they will only render a `NavigatorButton` and pass their `JsonFormDispatch` to root node via Context.
Development nodes can be found in these issues

|Issue/PR|Notes|
|:----|:----|
| [🖍️ WP-Builder: Integrate Form builder with Gutenberg Navigator](https://github.com/bangank36/WP-Builder/issues/17) ||
| [🖍️ WP-Builder: with or within jsonforms](https://github.com/bangank36/WP-Builder/issues/24) ||
| [WP-Builder: Introduce new NavigatorLayout #19](https://github.com/bangank36/WP-Builder/issues/19) ||

## Contributing
Are very welcome!! Please open new issues, PRs about anything relevant to this project scope and we can have a look together!
