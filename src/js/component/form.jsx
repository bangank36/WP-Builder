import React, { useState } from "react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import TextControl, { textControlTester } from "../renderers/TextControl";
import MultilineTextControl, { multilineTextControlTester } from "../renderers/MultilineTextControl";
import ColorPaletteTextControl, { colorPaletteControlTester } from "../renderers/ColorPaletteControl";
import BooleanToggleControl, { booleanToggleControlTester } from "../renderers/BooleanToggleControl";
import BooleanCheckboxControl, { booleanCheckboxControlTester } from "../renderers/BooleanCheckboxControl";
import GutenbergNavigatorlLayoutRenderer, { gutenbergNavigatorLayoutTester } from "../renderers/NavigatorLayout";

const schema = {
  type: "object",
  properties: {
    address: {
      type: 'object',
      properties: {
        street_address: { type: 'string' },
        city: { type: 'string' },
        state: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            mail: { type: 'string' },
          }
        }
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
  { tester: gutenbergNavigatorLayoutTester, renderer: GutenbergNavigatorlLayoutRenderer}
];

export default function App() {
  const [data, setData] = useState(initialData);
  return (
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
  );
}
