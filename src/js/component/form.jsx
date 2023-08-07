import React, { useState } from "react";
import {
  vanillaRenderers as materialRenderers,
  vanillaCells as materialCells,
} from "@jsonforms/vanilla-renderers";
import { JsonForms } from "@jsonforms/react";
import TextControl, { textControlTester } from "../renderers/Primitive/TextControl";
import IntegerControl, { integerControlTester } from "../renderers/Primitive/IntegerControl";
import NumberControl, { numberControlTester } from "../renderers/Primitive/NumberControl";
import TextTranformControl, { textTransformControlTester } from "../renderers/Primitive/TextTransformControl";
import DatepickerControl, { datepickerControlTester } from "../renderers/Primitive/DatepickerControl";
import MultilineTextControl, { multilineTextControlTester } from "../renderers/Primitive/MultilineTextControl";
import ColorPaletteTextControl, { colorPaletteControlTester } from "../renderers/Primitive/ColorPaletteControl";
import BooleanCheckboxControl, { booleanCheckboxControlTester } from "../renderers/Primitive/BooleanCheckboxControl";
import BooleanToggleControl, { booleanToggleControlTester } from "../renderers/Primitive/BooleanToggleControl";
import GutenbergToggleGroupControl, { gutenbergToggleGroupTester } from "../renderers/Primitive/ToggleGroupControl";
import GutenbergToggleGroupOneOfControl, { gutenbergToggleGroupOneOfTester } from "../renderers/Primitive/ToggleGroupOneOfControl";
import GutenbergComboboxControl, { gutenbergComboboxTester } from "../renderers/Primitive/ComboboxControl";
import GutenbergComboboxOneOfControl, { gutenbergComboboxOneOfTester } from "../renderers/Primitive/ComboboxOneOfControl";
import GutenbergObjectRenderer, { gutenbergObjectControlTester } from "../renderers/ObjectRenderer";
import GutenbergArrayRenderer, { gutenbergArrayControlTester } from "../renderers/ArrayControlRenderer";
import GutenbergEnumArrayRenderer, { gutenbergEnumArrayRendererTester } from "../renderers/MultiEnumArrayControl";
import PortedArrayRenderer, { portedArrayControlTester } from "../renderers/PortedArrayRenderer";
import GutenbergNavigatorlLayoutRenderer, { gutenbergNavigatorLayoutTester } from "../renderers/NavigatorLayout";
import GutenbergVerticalLayoutRenderer, { gutenbergVerticalLayoutTester } from "../renderers/layouts/GutenbergVerticalLayout";
import GutenbergHorizontalLayoutRenderer, { gutenbergHorizontalLayoutTester } from "../renderers/layouts/GutenbergHorizontalLayout";
import GutenbergGroupLayoutRenderer, { gutenbergGroupLayoutTester } from "../renderers/layouts/GutenbergGroupLayout";

import {
  __experimentalGrid as Grid,
} from '@wordpress/components';

const schema = {
  type: "object",
  properties: {
    address: {
      type: 'object',
      properties: {
        houseNumber: { 
          type: 'number',
          maximum: 100,
          minimum: 1,
          default: 50,
          multipleOf: 1
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
  ...materialRenderers,
  //register custom renderers
  { tester: textControlTester, renderer: TextControl },
  { tester: integerControlTester, renderer: IntegerControl },
  { tester: numberControlTester, renderer: NumberControl },
  { tester: textTransformControlTester, renderer: TextTranformControl },
  { tester: datepickerControlTester, renderer: DatepickerControl },
  { tester: multilineTextControlTester, renderer: MultilineTextControl },
  { tester: colorPaletteControlTester, renderer: ColorPaletteTextControl },
  { tester: booleanToggleControlTester, renderer: BooleanToggleControl},
  { tester: booleanCheckboxControlTester, renderer: BooleanCheckboxControl},
  { tester: gutenbergToggleGroupTester, renderer: GutenbergToggleGroupControl},
  { tester: gutenbergComboboxTester, renderer: GutenbergComboboxControl},
  { tester: gutenbergComboboxOneOfTester, renderer: GutenbergComboboxOneOfControl},
  { tester: gutenbergToggleGroupOneOfTester, renderer: GutenbergToggleGroupOneOfControl},
  { tester: gutenbergObjectControlTester, renderer: GutenbergObjectRenderer},
  { tester: gutenbergArrayControlTester, renderer: GutenbergArrayRenderer},
  { tester: gutenbergEnumArrayRendererTester, renderer: GutenbergEnumArrayRenderer},
  // { tester: portedArrayControlTester, renderer: PortedArrayRenderer},
  { tester: gutenbergNavigatorLayoutTester, renderer: GutenbergNavigatorlLayoutRenderer},
  { tester: gutenbergVerticalLayoutTester, renderer: GutenbergVerticalLayoutRenderer},
  { tester: gutenbergHorizontalLayoutTester, renderer: GutenbergHorizontalLayoutRenderer},
  { tester: gutenbergGroupLayoutTester, renderer: GutenbergGroupLayoutRenderer}
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
