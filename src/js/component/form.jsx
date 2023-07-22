import React, { useState } from "react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";

import {
  __experimentalGrid as Grid,
} from '@wordpress/components';

const schema = {
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string",
      "minLength": 3,
      "description": "Please enter your first name"
    },
    "birthDate": {
      "type": "string",
      "format": "date",
      "description": "Please enter your birth date."
    },
    "nationality": {
      "type": "string",
    },
    "address": {
      "type": "object",
      "properties": {
        "street": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "country": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "code": {
              "type": "string",
              "maxLength": 2
            }
          }
        }
      }
    },
    "vegetarianOptions": {
      "type": "object",
      "properties": {
        "vegan": {
          "type": "boolean"
        },
        "favoriteVegetable": {
          "type": "string",
          "enum": [
            "Tomato",
            "Potato",
            "Salad",
            "Aubergine",
            "Cucumber",
            "Other"
          ]
        }
      }
    }
  }
};

const uischema = {
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "HorizontalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#"
        },
        {
          "type": "Control",
          "scope": "#/properties/address"
        },
        {
          "type": "Control",
          "scope": "#/properties/address/properties/country"
        },
        {
          "type": "Control",
          "scope": "#/properties/vegetarianOptions"
        },
      ]
    }
  ]
}

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
];

export default function App() {
  const [data, setData] = useState(initialData);
  return (
    <>
      <Grid>
        <JsonForms
          schema={schema}
          uischema={uischema}
          // data={data}
          renderers={renderers}
          cells={materialCells}
          onChange={({ data, _errors }) => {
            setData(data);
          }}
        />
      </Grid>
    </>
  );
}
