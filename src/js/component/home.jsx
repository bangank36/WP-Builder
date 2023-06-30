import React, { useState } from "react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import RatingControl, { ratingControlTester } from "../renderers/RatingControl";

const schema = {
  type: "object",
  properties: {
    textControl: {
      type: "string",
      label: "Text Control Label",
      description: "Text Control displays a 'string' Control"
    }
  },
};

const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/textControl",
    }
  ],
};

const initialData = {};

// list of renderers declared outside the App component
const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: ratingControlTester, renderer: RatingControl },
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
      onChange={({ data, _errors }) => setData(data)}
    />
  );
}
