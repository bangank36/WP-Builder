import React, { useState } from "react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { 
  JsonForms
} from "@jsonforms/react";
import TextControl, { textControlTester } from "../renderers/TextControl";
import MultilineTextControl, { multilineTextControlTester } from "../renderers/MultilineTextControl";
import ColorPaletteTextControl, { colorPaletteControlTester } from "../renderers/ColorPaletteControl";
import BooleanToggleControl, { booleanToggleControlTester } from "../renderers/BooleanToggleControl";
import BooleanCheckboxControl, { booleanCheckboxControlTester } from "../renderers/BooleanCheckboxControl";
import GutenbergObjectRenderer, { gutenbergObjectControlTester } from "../renderers/ObjectRenderer"; 

import {
  MaterialLabelRenderer,
  materialLabelRendererTester,
  MaterialListWithDetailRenderer,
  materialListWithDetailTester,
} from '../renderers/additional';

import {
  __experimentalNavigatorProvider as NavigatorProvider,
  __experimentalNavigatorScreen as NavigatorScreen,
  __experimentalNavigatorButton as NavigatorButton,
  __experimentalNavigatorToParentButton as NavigatorToParentButton,
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
    type: "VerticalLayout",
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

const overridenRenderers = [
  { tester: materialLabelRendererTester, renderer: MaterialLabelRenderer },
  {
    tester: materialListWithDetailTester,
    renderer: MaterialListWithDetailRenderer,
  },
]

// list of renderers declared outside the App component
const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: textControlTester, renderer: TextControl },
  { tester: multilineTextControlTester, renderer: MultilineTextControl },
  { tester: colorPaletteControlTester, renderer: ColorPaletteTextControl },
  { tester: booleanToggleControlTester, renderer: BooleanToggleControl},
  { tester: booleanCheckboxControlTester, renderer: BooleanCheckboxControl},
  // { tester: gutenbergObjectControlTester, renderer: GutenbergObjectRenderer},
  // ...overridenRenderers
];

const Forms = ({children}) => (
  <>
    <div>{children}</div>
  </>
  )

export default function App() {
  const [data, setData] = useState(initialData);

  return (
    <>
    <Forms>
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
    </Forms>
    </>
  );
}
