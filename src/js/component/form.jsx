import React, { useState } from "react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import TextControl, { textControlTester } from "../renderers/Primitive/TextControl";
import MultilineTextControl, { multilineTextControlTester } from "../renderers/Primitive/MultilineTextControl";
import ColorPaletteTextControl, { colorPaletteControlTester } from "../renderers/Primitive/ColorPaletteControl";
import BooleanCheckboxControl, { booleanCheckboxControlTester } from "../renderers/Primitive/BooleanCheckboxControl";
import BooleanToggleControl, { booleanToggleControlTester } from "../renderers/Primitive/BooleanToggleControl";
import GutenbergToggleGroupControl, { gutenbergToggleGroupTester } from "../renderers/Primitive/ToggleGroupControl";
import GutenbergToggleGroupOneOfControl, { gutenbergToggleGroupOneOfTester } from "../renderers/Primitive/ToggleGroupOneOfControl";
import GutenbergObjectRenderer, { modifiedMaterialObjectControlTester } from "../renderers/ObjectRenderer";
import GutenbergArrayRenderer, { gutenbergArrayControlTester } from "../renderers/ArrayControlRenderer";
import PortedArrayRenderer, { portedArrayControlTester } from "../renderers/PortedArrayRenderer";
import GutenbergNavigatorlLayoutRenderer, { gutenbergNavigatorLayoutTester } from "../renderers/NavigatorLayout";
import GutenbergVerticalLayoutRenderer, { gutenbergVerticalLayoutTester } from "../renderers/GutenbergVerticalLayout";

import {
  __experimentalGrid as Grid,
} from '@wordpress/components';

export const schema = {
  type: 'object',
  properties: {
    occupation: { 
      type: 'object',
      properties: {
        name: { type: 'string' },
        years: { type: 'number' },
      }
    },
    comments: {
      type: 'array',
      minItems: 2,
      maxItems: 8,
      items: {
        type: 'object',
        properties: {
          date: {
            type: 'string',
            format: 'date',
          },
          message: {
            type: 'string',
            maxLength: 5,
          },
        },
      },
    },
  },
  required: ['occupation', 'nationality'],
};

export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/comments',
      options: {
        showSortButtons: true,
        restrict: true,
        detail: {
          type: 'Group',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/date',
            }
          ],
        },
      },
    },
    {
      type: 'Control',
      scope: '#/properties/occupation',
      options: {
        detail: {
          type: 'VerticalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/name',
            },
            {
              type: 'Control',
              scope: '#/properties/years',
            },
          ],
        },
      },
    }
  ],
};

const initialData = {
  address: {
    isOffice: false,
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
  // { tester: textControlTester, renderer: TextControl },
  // { tester: multilineTextControlTester, renderer: MultilineTextControl },
  // { tester: colorPaletteControlTester, renderer: ColorPaletteTextControl },
  // { tester: booleanToggleControlTester, renderer: BooleanToggleControl},
  // { tester: booleanCheckboxControlTester, renderer: BooleanCheckboxControl},
  // { tester: gutenbergToggleGroupTester, renderer: GutenbergToggleGroupControl},
  // { tester: gutenbergToggleGroupOneOfTester, renderer: GutenbergToggleGroupOneOfControl},
  { tester: modifiedMaterialObjectControlTester, renderer: GutenbergObjectRenderer},
  // { tester: gutenbergArrayControlTester, renderer: GutenbergArrayRenderer},
  // // { tester: portedArrayControlTester, renderer: PortedArrayRenderer},
  // { tester: gutenbergNavigatorLayoutTester, renderer: GutenbergNavigatorlLayoutRenderer},
  // { tester: gutenbergVerticalLayoutTester, renderer: GutenbergVerticalLayoutRenderer}
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
