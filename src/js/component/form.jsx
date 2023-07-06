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
import GutenbergObjectRenderer, { gutenbergObjectControlTester } from "../renderers/ObjectRenderer"; 

import {
  MaterialLabelRenderer,
  materialLabelRendererTester,
  MaterialListWithDetailRenderer,
  materialListWithDetailTester,
} from '../renderers/additional';

const schema = {
  type: "object",
  properties: {
    textControl: {
      type: "string",
      label: "Text Control Label",
      description: "Text Control displays a 'string' Control"
    },
    multilineTextControl: {
      type: "string",
      label: "Muliline Text Control Label",
      description: "Multiline Text Control displays a 'string' Control supports multiline"
    },
    colorPaletteControl: {
      type: "string",
      label: "Color Palette Control Label",
      description: "Color Picker with predefine palette"
    },
    booleanToggleControl: {
      type: "boolean",
      label: "Boolean Toggle Control Label",
      description: "Boolean Control with Toggle Renderer"
    },
    booleanCheckboxControl: {
      type: "boolean",
      label: "Boolean Checkbox Control Label",
      description: "Boolean Control with Checkbox Renderer"
    },
      address: {
        type: 'object',
        properties: {
          street_address: { type: 'string' },
          city: { type: 'string' },
          state: { type: 'string' },
        },
        required: ['street_address', 'city', 'state'],
      },
      user: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          mail: { type: 'string' },
        },
        required: ['name', 'mail'],
      },
    "users": {
      "type": "array",
      "items": {
        "type": "object",
        "title": "Users",
        "properties": {
          "firstname": {
            "type": "string"
          },
          "lastname": {
            "type": "string"
          },
          "email": {
            "type": "string",
            "format": "email"
          },
          "age": {
            "type": "number",
            "minimum": 0
          }
        },
        "required": [
          "firstname"
        ]
      }
    }
  },
};

const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/textControl",
    },
    {
      type: "Control",
      scope: "#/properties/multilineTextControl",
      options: {
        multi: true,
      },
    },
    {
      type: "Control",
      scope: "#/properties/colorPaletteControl",
      options: {
        format: 'color',
        colors:[
          {
            color: '#f00',
            name: 'Red'
          },
          {
            color: '#fff',
            name: 'White'
          },
          {
            color: '#00f',
            name: 'Blue'
          }
        ]
      },
    },
    {
      type: "Control",
      scope: "#/properties/booleanToggleControl",
      options: {
        toggle: true
      }
    },
    {
      type: "Control",
      scope: "#/properties/booleanCheckboxControl",
    },
    {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/address',
        },
        {
          type: 'Control',
          scope: '#/properties/user',
          rule: {
            effect: 'SHOW',
            condition: {
              type: 'LEAF',
              scope: '#/properties/address/properties/state',
              expectedValue: 'DC',
            },
          },
          options: {
            detail: {
              type: 'Group',
              label: 'User Data',
              elements: [
                { type: 'Control', scope: '#/properties/name' },
                {
                  type: 'Control',
                  scope: '#/properties/mail',
                },
              ],
            },
          },
        },
      ],
    },
    {
      "type": "ListWithDetail",
      "scope": "#/properties/users",
      "options": {
        "detail": {
          "type": "VerticalLayout",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/firstname",
                  "label": "First Name"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/lastname",
                  "label": "Last Name"
                }
              ]
            },
            {
              "type": "Control",
              "scope": "#/properties/age",
              "label": "Age"
            },
            {
              "type": "Control",
              "scope": "#/properties/email",
              "label": "Email"
            }
          ]
        }
      }
    }
  ],
};

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
  { tester: gutenbergObjectControlTester, renderer: GutenbergObjectRenderer},
  ...overridenRenderers
];

export default function App() {
  const [data, setData] = useState(initialData);
  return (
    <>
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
    </>
    
  );
}
