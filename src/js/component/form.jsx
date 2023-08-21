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
        },
      },
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
