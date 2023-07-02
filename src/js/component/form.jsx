import React, { useState } from "react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import TextControl, { textControlTester } from "../renderers/TextControl";

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
    }
  ],
};

const initialData = {};

// list of renderers declared outside the App component
const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: textControlTester, renderer: TextControl },
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
