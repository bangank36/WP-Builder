import React, { useState } from "react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import TextControl, { textControlTester } from "../renderers/TextControl";
import MultilineTextControl, { multilineTextControlTester } from "../renderers/MultilineTextControl";
import ColorPaletteTextControl, { colorPaletteControlTester } from "../renderers/ColorPaletteControl";

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
    }
  ],
};

const initialData = {};

// list of renderers declared outside the App component
const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: textControlTester, renderer: TextControl },
  { tester: multilineTextControlTester, renderer: MultilineTextControl },
  { tester: colorPaletteControlTester, renderer: ColorPaletteTextControl },
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
