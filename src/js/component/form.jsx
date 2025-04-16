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
    basic: {
      type: "object",
      properties: {
        design: {
          type: "string",
          enum: ["simple"],
          default: "simple"
        },
        theme: {
          type: "string",
          enum: ["auto", "dark"],
          default: "auto"
        },
        carouselTransition: {
          type: "string",
          enum: ["slide"],
          default: "slide"
        },
        enableDownload: {
          type: "boolean",
          default: false
        },
        carouselInfinite: {
          type: "boolean",
          default: true
        },
        initialThumbnail: {
          type: "boolean",
          default: true
        }
      }
    },
    caption: {
      type: "object",
      properties: {
        captionPosition: {
          type: "string",
          enum: ["overlay", "below"],
          default: "overlay"
        },
        captionDisplay: {
          type: "string",
          enum: ["always", "hover", "none"],
          default: "always"
        },
        hideSectionCaption: {
          type: "boolean",
          default: false
        }
      }
    },
    lightbox: {
      type: "object",
      properties: {
        connectBlockLightbox: {
          type: "boolean",
          default: false
        },
        forceLightboxGallery: {
          type: "boolean",
          default: false
        },
        forceLightboxAutolayouts: {
          type: "boolean",
          default: false
        },
        showLightboxIndicator: {
          type: "boolean",
          default: false
        },
        lightboxifyPortfolio: {
          type: "string",
          default: ""
        }
      }
    },
    display: {
      type: "object",
      properties: {
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
          default: true
        },
        hiresZoom: {
          type: "boolean",
          default: true
        },
        zoomable: {
          type: "boolean",
          default: true
        }
      }
    },
    pdf: {
      type: "object",
      properties: {
        proxy: {
          type: "string",
          enum: ["", "imgix", "imagekit", "gumlet", "google-viewer"],
          default: ""
        },
        proxyUrl: {
          type: "string",
          default: ""
        },
        viewer: {
          type: "string",
          enum: ["basic", "native", "standard", "express"],
          default: "standard"
        },
        useStockViewer: {
          type: "boolean",
          default: false
        },
        theme: {
          type: "string",
          enum: ["light", "dark"],
          default: "light"
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
      type: "Control",
      label: "Basic Settings",
      scope: "#/properties/basic",
      options: {
        detail: {
          theme: {
            control: "ToggleGroupControl"
          }
        }
      }
    },
    {
      type: "Control",
      label: "Caption Settings",
      scope: "#/properties/caption"
    },
    {
      type: "Control",
      label: "Lightbox Settings",
      scope: "#/properties/lightbox"
    },
    {
      type: "Control",
      label: "Display Settings",
      scope: "#/properties/display",
      options: {
        detail: {
          idleTimeout: {
            control: "SliderControl"
          }
        }
      }
    },
    {
      type: "Control",
      label: "PDF Settings",
      scope: "#/properties/pdf"
    }
  ]
};

const initialData = {
  basic: {
    design: 'simple',
    theme: 'auto',
    carouselTransition: 'slide',
    enableDownload: false,
    carouselInfinite: true,
    initialThumbnail: true
  },
  caption: {
    captionPosition: 'overlay',
    captionDisplay: 'always',
    hideSectionCaption: false
  },
  lightbox: {
    connectBlockLightbox: false,
    forceLightboxGallery: false,
    forceLightboxAutolayouts: false,
    showLightboxIndicator: false,
    lightboxifyPortfolio: ''
  },
  display: {
    idleTimeout: 5000,
    forceToolbar: true,
    hiresZoom: true,
    zoomable: true
  },
  pdf: {
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
