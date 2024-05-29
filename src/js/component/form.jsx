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
    address: {
      type: 'object',
      properties: {
        street_address: { 
          type: 'string',
        },
        city: { type: 'string' },
        state: { type: 'string' },
        isOffice: { 
          type: 'boolean',
          description: 'Is this an office address?',
        },
        registeredDate: {
          type: 'string',
          format: 'date',
        },
        roofColor: {
          type: 'string',
          format: 'color',
        },
        country: {
          type: 'object',
          properties: {
            name: { type: 'string' },
          }
        },
        gender: {
          type: "string",
          enum: [ "male", "female", "other" ],
          description: "The gender of the user"
        },
        race: {
          type: 'string',
          oneOf: [
            { const: 'asian', title: 'Asian' },
            { const: 'latin', title: 'Latin' },
          ],
        },
        businessHours: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              date: { 
                type: 'string',
              },
            }
            
          },
        },
      }
    },
    business: {
      type: 'object',
      properties: {
        job: {
          type: 'string',
        },
        experience: {
          type: 'string',
          maxLength: 5,
        }
      },
    },
    showOnHover: {
      type: 'boolean',
      description: 'Show Drawer panel on cart icon or link hover'
    },
    position: {
      type: 'string',
      enum: ['right', 'left'],
      description: 'Position of the drawer'
    },
    width: {
      type: 'string',
      description: 'CSS valid drawer width'
    },
    height: {
      type: 'string',
      description: 'CSS valid drawer height'
    },
    margin: {
      type: 'string',
      description: 'CSS valid margin for drawer container'
    },
    effect: {
      type: 'string',
      enum: ['slide', 'fade'],
      description: 'Appearing effect of the drawer'
    },
    effectDuration: {
      type: 'string',
      description: 'Appearing effect duration in ms or s'
    },
    effectEasing: {
      type: 'string',
      description: 'Valid CSS easing, like: ease, linear, cubic-bezier'
    },
    backgroundColor: {
      type: 'string',
      format: 'color',
      description: 'Drawer background color'
    },
    color: {
      type: 'string',
      format: 'color',
      description: 'Drawer main text color'
    },
    basicFontSize: {
      type: 'string',
      description: 'Drawer base font size'
    },
    basicFontFamily: {
      type: 'string',
      description: 'Set the drawer font'
    },
    useCustomScrollbar: {
      type: 'boolean',
      description: 'Use custom scrollbar, works in webkit browsers only'
    },
    scrollbarTrackColor: {
      type: 'string',
      format: 'color',
      description: 'Webkit browsers scrolltrack color'
    },
    scrollbarThumbColor: {
      type: 'string',
      format: 'color',
      description: 'Webkit browsers scrollthumb color'
    },
    scrollbarWidth: {
      type: 'string',
      description: 'Webkit browsers scrollbar width'
    },
    overlayColor: {
      type: 'string',
      format: 'color',
      description: 'Overlay color to fade main site content'
    },
    closeIconSize: {
      type: 'string',
      description: 'Drawer close icon size'
    },
    closeIconColor: {
      type: 'string',
      format: 'color',
      description: 'Drawer close icon color'
    },
    closeIconBackgroundColor: {
      type: 'string',
      format: 'color',
      description: 'Drawer close icon background'
    },
    closeIconPosition: {
      type: 'string',
      enum: ['left', 'right'],
      description: 'Position of close icon'
    },
    closeIconTop: {
      type: 'string',
      description: 'CSS top position of icon, 0 is default'
    },
    closeIconView: {
      type: 'string',
      enum: ['inside', 'outside'],
      description: 'Close icon view'
    },
    headerText: {
      type: 'string',
      description: 'Set the text of Cart Header'
    },
    headerColor: {
      type: 'string',
      format: 'color',
      description: 'Header text color'
    },
    headerFontSize: {
      type: 'string',
      description: 'Header text font-size'
    },
    headerFontFamily: {
      type: 'string',
      description: 'Set the Cart Header font-family'
    },
    headerTextAlign: {
      type: 'string',
      enum: ['left', 'center', 'right'],
      description: 'Header text-align'
    },
    headerMargin: {
      type: 'string',
      description: 'Valid CSS margin for header'
    },
    headerTextTransform: {
      type: 'string',
      enum: ['uppercase', 'capitalize', 'lowercase', 'none'],
      description: 'Set valid CSS text-transform'
    },
    itemText: {
      type: 'string',
      description: 'Set own Item text'
    },
    quantityText: {
      type: 'string',
      description: 'Set own Quantity text'
    },
    productFontSize: {
      type: 'string',
      description: 'Set product title font size'
    },
    productFontFamily: {
      type: 'string',
      description: 'Set product title font-family'
    },
    productColor: {
      type: 'string',
      format: 'color',
      description: 'Set product title color'
    },
    variantFontSize: {
      type: 'string',
      description: 'Set product variant font size'
    },
    variantFontFamily: {
      type: 'string',
      description: 'Set product variant font-family'
    },
    variantColor: {
      type: 'string',
      format: 'color',
      description: 'Set variant options colors'
    },
    pricesPreText: {
      type: 'string',
      description: 'Add some text to prices'
    },
    pricesFontFamily: {
      type: 'string',
      description: 'Price font-family'
    },
    pricesFontSize: {
      type: 'string',
      description: 'Price font size'
    },
    pricesColor: {
      type: 'string',
      format: 'color',
      description: 'Price color'
    },
    subTotalAlign: {
      type: 'string',
      enum: ['left', 'center', 'right'],
      description: 'Subtotal text-align'
    },
    subTotalFontSize: {
      type: 'string',
      description: 'Subtotal font-size'
    },
    subTotalFontFamily: {
      type: 'string',
      description: 'Subtotal font-family'
    },
    subTotalText: {
      type: 'string',
      description: 'Set the subtotal text'
    },
    subTotalColor: {
      type: 'string',
      format: 'color',
      description: 'Set the subtotal text color'
    },
    checkoutButtonText: {
      type: 'string',
      description: 'Set the text of checkout Button'
    },
    checkoutButtonFontSize: {
      type: 'string',
      description: 'Checkout button font-size'
    },
    checkoutButtonFontFamily: {
      type: 'string',
      description: 'Checkout button font-family'
    },
    checkoutButtonColor: {
      type: 'string',
      format: 'color',
      description: 'Checkout button color'
    },
    checkoutButtonBackgroundColor: {
      type: 'string',
      format: 'color',
      description: 'Checkout button background color'
    },
    checkoutButtonAlign: {
      type: 'string',
      enum: ['left', 'center', 'right'],
      description: 'Checkout button align'
    },
    showIfCartUpdated: {
      type: 'boolean',
      description: 'Show drawer if product was added/removed from cart'
    },
    restrictShowOnUpdateUrls: {
      type: 'string',
      description: 'URLs where you do not want Cart Drawer to appear after each cart update'
    },
    closeOnOverlayClick: {
      type: 'boolean',
      description: 'Close drawer if site or overlay is clicked'
    },
    onUpdateFunction: {
      type: ['null', 'string'],
      description: 'Function called on each cart update and on initial build, has drawer YUI element and cart JSON data in callback: function(el,data){}'
    }
  },
};

const uischema = {
  "type": "NavigatorLayout",
  "label": "Address",
  "elements": [
    {
      "type": "Control",
      "label": "Name",
      "scope": "#"
    }
  ]
}

const initialData = {
  address: {
    gender: "other",
    comments: [{
      comment: 'test'
    },{
      comment: 'test1'
    }]
  }
};

// list of renderers declared outside the App component
const renderers = [
  ...vanillaRenderers,
  //register custom renderers
  ...gutenbergRenderers
];

export default function App() {
  const [data, setData] = useState(initialData);
  return (
    <>
      <Grid columns={ 3 }>
        <JsonForms
          schema={schema}
          uischema={uischema}
          renderers={renderers}
          cells={vanillaCells}
          onChange={({ data, _errors }) => {
            setData(data);
          }}
        />
        <div>
          <pre>
          {JSON.stringify(data, null, 4)}
          </pre>
        </div>
      </Grid>
    </>
  );
}
