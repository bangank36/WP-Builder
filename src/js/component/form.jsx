import React, { useState } from "react";
import {
  vanillaRenderers as materialRenderers,
  vanillaCells as materialCells,
} from "@jsonforms/vanilla-renderers";
import { JsonForms } from "@jsonforms/react";
import TextControl, { textControlTester } from "../renderers/Primitive/TextControl";
import MultilineTextControl, { multilineTextControlTester } from "../renderers/Primitive/MultilineTextControl";
import ColorPaletteTextControl, { colorPaletteControlTester } from "../renderers/Primitive/ColorPaletteControl";
import BooleanToggleControl, { booleanToggleControlTester } from "../renderers/Primitive/BooleanToggleControl";
import GutenbergObjectRenderer, { gutenbergObjectControlTester } from "../renderers/ObjectRenderer";
import GutenbergNavigatorlLayoutRenderer, { gutenbergNavigatorLayoutTester } from "../renderers/NavigatorLayout";

import {
  __experimentalGrid as Grid,
} from '@wordpress/components';

const schema = {
  type: "object",
  properties: {
    address: {
      type: 'object',
      properties: {
        street_address: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        country: {
          type: 'object',
          properties: {
            name: { type: 'string' },
          }
        },
        comments: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              comment: { 
                type: 'string',
                maxLength: 5, 
              },
            }
            
          },
        },
      }
    },
    business: {
      type: 'object',
      properties: {
        job: { type: 'string' }
      }
    }
  },
};

const uischema = {
  type: "NavigatorLayout",
  elements: [
    {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/comments',
        },
        {
          type: 'Control',
          scope: '#/properties/address',
        },
        {
          type: 'Control',
          scope: '#/properties/business',
        }
      ],
    }
  ],
}

const initialData = {};

// list of renderers declared outside the App component
const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: textControlTester, renderer: TextControl },
  { tester: multilineTextControlTester, renderer: MultilineTextControl },
  { tester: colorPaletteControlTester, renderer: ColorPaletteTextControl },
  { tester: booleanToggleControlTester, renderer: BooleanToggleControl},
  { tester: booleanCheckboxControlTester, renderer: BooleanCheckboxControl},
  { tester: gutenbergObjectControlTester, renderer: GutenbergObjectRenderer},
  { tester: gutenbergNavigatorLayoutTester, renderer: GutenbergNavigatorlLayoutRenderer}
];

export default function App() {
  const [data, setData] = useState(initialData);
  return (
    <>
      <Grid columns={ 3 }>
        <JsonForms
          schema={schema}
          uischema={uischema}
          data={data}
          renderers={renderers}
          cells={materialCells}
          onChange={({ data, _errors }) => {
            console.log(data);
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
