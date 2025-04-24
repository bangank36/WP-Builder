/**
 * External dependencies
 */
import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { vanillaCells, vanillaRenderers } from '@jsonforms/vanilla-renderers';

/**
 * WordPress dependencies
 */
import { __experimentalGrid as Grid } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { gutenbergRenderers } from '../js/renderers';
import './form-style.scss';

// Default schema for the form
const schema = {
  type: "object",
  properties: {
    basic: {
      type: "object",
      properties: {
        designs: {
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
    }
  }
};

// Default UI schema
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
      label: "Display Settings",
      scope: "#/properties/display",
      options: {
        detail: {
          idleTimeout: {
            control: "SliderControl"
          }
        }
      }
    }
  ]
};

// Default initial data
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
  display: {
    idleTimeout: 5000,
    forceToolbar: true,
    hiresZoom: true,
    zoomable: true
  }
};

// Combined renderers
const renderers = [
  ...vanillaRenderers,
  ...gutenbergRenderers
];

/**
 * Form Component
 * 
 * @param {Object} props Component props
 * @param {Object} props.customSchema Custom schema to override default
 * @param {Object} props.customUiSchema Custom UI schema to override default
 * @param {Object} props.customData Custom initial data to override default
 * @param {Function} props.onChange Callback when form data changes
 * @param {boolean} props.showPreview Whether to show the JSON preview
 */
function FormComponent({ 
  customSchema, 
  customUiSchema, 
  customData, 
  onChange,
  showPreview = true
}) {
  // Use custom schemas or defaults
  const formSchema = customSchema || schema;
  const formUiSchema = customUiSchema || uischema;
  const formInitialData = customData || initialData;
  
  // State for form data
  const [data, setData] = useState(formInitialData);
  
  // Handle form changes
  const handleChange = ({ data: newData, errors }) => {
    setData(newData);
    if (onChange) {
      onChange(newData, errors);
    }
  };
  
  return (
    <div className="wp-builder-form-container">
      {showPreview ? (
        <Grid columns={2}>
          <div className="wp-builder-form">
            <JsonForms
              schema={formSchema}
              uischema={formUiSchema}
              data={data}
              renderers={renderers}
              cells={vanillaCells}
              onChange={handleChange}
            />
          </div>
          <div className="wp-builder-preview">
            <h3>Form Data</h3>
            <pre>
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </Grid>
      ) : (
        <div className="wp-builder-form">
          <JsonForms
            schema={formSchema}
            uischema={formUiSchema}
            data={data}
            renderers={renderers}
            cells={vanillaCells}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}

export default FormComponent;
