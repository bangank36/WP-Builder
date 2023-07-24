import React, { useState } from "react";
import {
  vanillaRenderers as materialRenderers,
  vanillaCells as materialCells,
} from "@jsonforms/vanilla-renderers";
import { JsonForms } from "@jsonforms/react";
import TextControl, { textControlTester } from "../renderers/Primitive/TextControl";
import MultilineTextControl, { multilineTextControlTester } from "../renderers/Primitive/MultilineTextControl";
import ColorPaletteTextControl, { colorPaletteControlTester } from "../renderers/Primitive/ColorPaletteControl";
import BooleanCheckboxControl, { booleanCheckboxControlTester } from "../renderers/Primitive/BooleanCheckboxControl";
import BooleanToggleControl, { booleanToggleControlTester } from "../renderers/Primitive/BooleanToggleControl";
import GutenbergToggleGroupControl, { gutenbergToggleGroupTester } from "../renderers/Primitive/ToggleGroupControl";
import GutenbergToggleGroupOneOfControl, { gutenbergToggleGroupOneOfTester } from "../renderers/Primitive/ToggleGroupOneOfControl";
import GutenbergObjectRenderer, { gutenbergObjectControlTester } from "../renderers/ObjectRenderer";
import GutenbergArrayRenderer, { gutenbergArrayControlTester } from "../renderers/ArrayControlRenderer";
import PortedArrayRenderer, { portedArrayControlTester } from "../renderers/PortedArrayRenderer";
import GutenbergNavigatorlLayoutRenderer, { gutenbergNavigatorLayoutTester } from "../renderers/NavigatorLayout";
import GutenbergVerticalLayoutRenderer, { gutenbergVerticalLayoutTester } from "../renderers/GutenbergVerticalLayout";

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
          format: 'toggle-group',
          description: "The gender of the user"
        },
        race: {
          type: 'string',
          format: 'toggle-group',
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
  type: 'NavigatorLayout',
  elements: [
    {
      type: "Control",
      scope: "#",
    }
  ],
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
  ...materialRenderers,
  //register custom renderers
  { tester: textControlTester, renderer: TextControl },
  { tester: multilineTextControlTester, renderer: MultilineTextControl },
  { tester: colorPaletteControlTester, renderer: ColorPaletteTextControl },
  { tester: booleanToggleControlTester, renderer: BooleanToggleControl},
  { tester: booleanCheckboxControlTester, renderer: BooleanCheckboxControl},
  { tester: gutenbergToggleGroupTester, renderer: GutenbergToggleGroupControl},
  { tester: gutenbergToggleGroupOneOfTester, renderer: GutenbergToggleGroupOneOfControl},
  { tester: gutenbergObjectControlTester, renderer: GutenbergObjectRenderer},
  { tester: gutenbergArrayControlTester, renderer: GutenbergArrayRenderer},
  // { tester: portedArrayControlTester, renderer: PortedArrayRenderer},
  { tester: gutenbergNavigatorLayoutTester, renderer: GutenbergNavigatorlLayoutRenderer},
  { tester: gutenbergVerticalLayoutTester, renderer: GutenbergVerticalLayoutRenderer}
];

export default function App() {
  const [data, setData] = useState(initialData);
  return (
    <>
      <Grid columns={ 3 }>
        <JsonForms
          schema={schema}
          uischema={uischema}
          // data={data}
          renderers={renderers}
          cells={materialCells}
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
