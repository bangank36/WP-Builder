import React, { useState } from "react";
import { vanillaCells, vanillaRenderers } from '@jsonforms/vanilla-renderers';
import { JsonForms } from "@jsonforms/react";
import { gutenbergRenderers } from '../renderers';

import {
  __experimentalGrid as Grid,
} from '@wordpress/components';

const schema = {
  type: "object",
  properties: {
    design: {
      type: "string",
      oneOf: [
        { const: 'simple', title: 'Simple' },
        { const: 'extended', title: 'Extended' },
        { const: 'classic', title: 'Classic' },
      ],
      description: `Change look & feel of lightbox interface`,
      default: "simple",
      "format": "toggle-group"
    },
    theme: {
      type: "string",
      oneOf: [
        { const: "auto", title: "Auto" },
        { const: "light", title: "Light" },
        { const: "dark", title: "Dark" }
      ],
      default: "auto",
      "format": "toggle-group"
    },
    carouselTransition: {
      type: "string",
      oneOf: [
        { const: "slide", title: "Slide" },
        { const: "classic", title: "Classic" },
        { const: "crossfade", title: "Crossfade" },
        { const: "fade", title: "Fade" }
      ],
      default: "slide",
      "format": "toggle-group"
    },
    enableDownload: {
      type: "boolean",
      description: "Enable download button on image lightbox",
      default: false
    },
    carouselInfinite: {
      type: "boolean",
      description: "Toggle carousel infinite (loop) mode",
      default: true
    },
    initialThumbnail: {
      type: "boolean",
      description: "Show thumbnail on initial lightbox load",
      default: true
    },
    captionPosition: {
      type: "string",
      oneOf: [
        { const: "overlay", title: "Overlay" },
        { const: "below", title: "Below" }
      ],
      default: "overlay",
      format: "toggle-group"
    },
    captionDisplay: {
      type: "string",
      oneOf: [
        { const: "always", title: "Always" },
        { const: "hover", title: "On Hover" },
        { const: "none", title: "Hidden" }
      ],
      default: "always",
      "format": "toggle-group"
    },
    connectBlockLightbox: {
      type: "string",
      description: "Connect lightbox of all blocks on section or page",
      oneOf: [
        { const: "", title: "None" },
        { const: "section", title: "Section" },
        { const: "page", title: "Page" }
      ],
      default: "",
      "format": "toggle-group"
    },
    hideSectionCaption: {
      type: "boolean",
      description: "Hide slide caption on main 7.1 Gallery sections and show only on lightbox",
      default: false
    },
    forceLightboxGallery: {
      type: "boolean",
      description: "Force lightbox on all Slideshow Gallery sections",
      default: false
    },
    forceLightboxAutolayouts: {
      type: "boolean",
      description: "Force lightbox on all Auto layouts sections",
      default: false
    },
    showLightboxIndicator: {
      type: "boolean",
      default: false
    },
    idleTimeout: {
      type: "integer",
      title: "Idle Timeout (ms)",
      description: "Time in milliseconds before the interface becomes idle",
      default: 5000,
      minimum: 1000,
      maximum: 20000,
      multipleOf: 1000
    },
    forceToolbar: {
      type: "boolean",
      description: "Force toolbar always show regardless of the slide type",
      default: true
    },
    hiresZoom: {
      type: "boolean",
      description: "Toggle high resolution zoom on images slides",
      default: true
    },
    zoomable: {
      type: "boolean",
      description: "Toggle zoom feature on images slides",
      default: true
    },
    lightboxifyPortfolio: {
      type: "string",
      description: "Turn portfolio project's gallery into lightbox, requires commma separated list of portfolio pathname to lightboxify",
      placeholder: "/portfolio-1,/portfolio-2",
      default: ""
    },
    pdf: {
      type: "object",
      properties: {
        enabled: {
          type: "boolean",
          default: true
        },
        proxy: {
          type: "string",
          oneOf: [
            { const: "", title: "None" },
            { const: "imgix", title: "Imgix" },
            { const: "imagekit", title: "ImageKit" },
            { const: "gumlet", title: "Gumlet" },
            { const: "google-viewer", title: "Google Viewer" }
          ],
          default: ""
        },
        proxyUrl: {
          type: "string",
          default: ""
        },
        viewer: {
          type: "string",
          oneOf: [
            { const: "basic", title: "Basic" },
            { const: "native", title: "Native" },
            { const: "standard", title: "Standard" },
            { const: "express", title: "Express" }
          ],
          default: "standard"
        },
        useStockViewer: {
          type: "boolean",
          description: "Use stock (mozilla) viewer for Standard viewer",
          default: false
        },
        theme: {
          type: "string",
          oneOf: [
            { const: "light", title: "Light" },
            { const: "dark", title: "Dark" }
          ],
          default: "light",
          format: "toggle-group"
        },
        width: {
          type: "string",
          default: "1200"
        },
        height: {
          type: "string",
          default: "1200"
        }
      }
    }
  }
};

const uischema = {
  type: "NavigatorLayout",
  elements: [
    {
      type: "VerticalLayout",
      label: "Design Settings",
      elements: [
        {
          "type": "Control",
          scope: "#/properties/design",
          options: {
            format: "radio"
          }
        },
        {
          type: "Control",
          label: "Theme",
          scope: "#/properties/theme",
        },
        {
          type: "Control",
          label: "Carousel Transition",
          scope: "#/properties/carouselTransition"
        },
        {
          type: "Control",
          label: "Enable Download",
          scope: "#/properties/enableDownload"
        },
        {
          type: "Control",
          label: "Carousel Infinite",
          scope: "#/properties/carouselInfinite"
        },
        {
          type: "Control",
          label: "Initial Thumbnail",
          scope: "#/properties/initialThumbnail"
        }
      ]
    },
    {
      type: "Group",
      label: "Caption Settings",
      elements: [
        {
          type: "Control",
          label: "Caption Position",
          scope: "#/properties/captionPosition",
          options: {
            format: "radio"
          }
        },
        {
          type: "Control",
          label: "Caption Display",
          scope: "#/properties/captionDisplay",
          options: {
            control: "ToggleGroupControl"
          }
        },
        {
          type: "Control",
          label: "Hide Section Caption",
          scope: "#/properties/hideSectionCaption"
        }
      ]
    },
    {
      type: "Group",
      label: "Lightbox Settings",
      elements: [
        {
          type: "Control",
          label: "Connect Block Lightbox",
          scope: "#/properties/connectBlockLightbox"
        },
        {
          type: "Control",
          label: "Force Lightbox Gallery",
          scope: "#/properties/forceLightboxGallery"
        },
        {
          type: "Control",
          label: "Force Lightbox Autolayouts",
          scope: "#/properties/forceLightboxAutolayouts"
        },
        {
          type: "Control",
          label: "Show Lightbox Indicator",
          scope: "#/properties/showLightboxIndicator"
        },
        {
          type: "Control",
          label: "Lightboxify Portfolio",
          scope: "#/properties/lightboxifyPortfolio"
        }
      ]
    },
    {
      type: "Group",
      label: "Display Settings",
      elements: [
        {
          type: "Control",
          label: "Idle Timeout",
          scope: "#/properties/idleTimeout",
          options: {
            control: "SliderControl"
          }
        },
        {
          type: "Control",
          label: "Force Toolbar",
          scope: "#/properties/forceToolbar"
        },
        {
          type: "Control",
          label: "Hires Zoom",
          scope: "#/properties/hiresZoom"
        },
        {
          type: "Control",
          label: "Zoomable",
          scope: "#/properties/zoomable"
        }
      ]
    },
    {
      type: "Group",
      label: "PDF Settings",
      elements: [
        {
          type: "Control",
          label: "Enabled",
          label: "Enable PDF lightbox",
          scope: "#/properties/pdf/properties/enabled",
        },
        {
          type: "Control",
          label: "Proxy",
          scope: "#/properties/pdf/properties/proxy",
          rule: {
            "effect": "SHOW",
            "condition": {
              "type": "LEAF",
              "scope": "#/properties/pdf/properties/enabled",
              "expectedValue": 'ALWAYS_HIDE'
            }
          }
        },
        {
          type: "Control",
          label: "Proxy URL",
          scope: "#/properties/pdf/properties/proxyUrl",
          rule: {
            "effect": "SHOW",
            "condition": {
              "type": "LEAF",
              "scope": "#/properties/pdf/properties/enabled",
              "expectedValue": 'ALWAYS_HIDE'
            }
          }
        },
        {
          type: "Control",
          label: "Viewer",
          scope: "#/properties/pdf/properties/viewer",
          options: {
            format: "radio"
          }
        },
        {
          type: "Control",
          label: "Use Stock Viewer",
          scope: "#/properties/pdf/properties/useStockViewer",
          rule: {
            "effect": "SHOW",
            "condition": {
              "type": "LEAF",
              "scope": "#/properties/pdf/properties/viewer",
              "expectedValue": 'standard'
            }
          }
        },
        {
          type: "Control",
          label: "Theme",
          scope: "#/properties/pdf/properties/theme",
          options: {
            control: "ToggleGroupControl"
          }
        },
        {
          type: "HorizontalLayout",
          elements: [
            {
              type: "Control",
              label: "Width",
              scope: "#/properties/pdf/properties/width"
            },
            {
              type: "Control",
              label: "Height",
              scope: "#/properties/pdf/properties/height"
            }
          ]
        }
      ]
    }
  ]
};

const initialData = {
  design: 'simple',
  theme: 'auto',
  carouselTransition: 'slide',
  enableDownload: false,
  carouselInfinite: true,
  initialThumbnail: true,
  captionPosition: 'overlay',
  captionDisplay: 'always',
  connectBlockLightbox: '',
  hideSectionCaption: false,
  forceLightboxGallery: false,
  forceLightboxAutolayouts: false,
  showLightboxIndicator: false,
  idleTimeout: 5000,
  forceToolbar: true,
  hiresZoom: true,
  zoomable: true,
  lightboxifyPortfolio: '',
  pdf: {
    enabled: true,
    proxy: "",
    proxyUrl: "",
    viewer: "standard",
    useStockViewer: false,
    theme: "light",
    width: "1200",
    height: "1200"
  }
};

const renderers = [
  ...vanillaRenderers,
  ...gutenbergRenderers
];

export default function App() {
  const [data, setData] = useState(initialData);
  return (
    <>
      <Grid columns={2}>
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={renderers}
          cells={vanillaCells}
          onChange={({ data, errors }) => {
            setData(data);
            console.log('Validation errors:', errors);
          }}
        />
        <div>
          <pre>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </Grid>
    </>
  );
}
