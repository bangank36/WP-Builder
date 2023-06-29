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
    rating: {
      type: "integer",
    },
    done: {
      type: "boolean",
    },
    due_date: {
      type: "string",
      format: "date",
    },
    recurrence: {
      type: "string",
      enum: ["Never", "Daily", "Weekly", "Monthly"],
    },
  },
};

const uischema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/rating",
    },
    {
      type: "Control",
      label: false,
      scope: "#/properties/done",
    },
    {
      type: "HorizontalLayout",
      elements: [
        {
          type: "Control",
          scope: "#/properties/due_date",
        },
        {
          type: "Control",
          scope: "#/properties/recurrence",
        },
      ],
    },
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
