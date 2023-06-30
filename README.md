# WP-Builder
JSON Schema-based forms with Wordpress Components renderer

## Roadmap
The goal of this project is to replace all controls in @mui into @wordpress/components to take advantage of the full set of [custom controls](https://jsonforms.io/docs/renderer-sets/) such as: duotone picker, datetime picker...

### JSON Schema Features

|JSON Schema|Renderer|React Material|Gutenberg|
|:----|:----|:----|:----|
|boolean|Checkbox| ✅ | |
| |Toggle|✅| |
|integer|Number|✅| |
| |Text|❌| |
|String|Text|✅| https://github.com/bangank36/WP-Builder/issues/4 |
| |Textarea|✅| |

