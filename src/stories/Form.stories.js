import React, { useState } from "react";
import { issue_1948 } from '@jsonforms/examples' 
import {
    materialRenderers,
    materialCells,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Form',
  component: JsonForms,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'padded',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  }
};

const schema = {
    type: "object",
    properties: {
      address: {
        type: 'object',
        properties: {
          street_address: { 
            type: 'string',
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

// Export const in for loop


// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    schema: issue_1948.schema,
    renderers: [...materialRenderers],
    cells: [...materialCells]
  },
};
