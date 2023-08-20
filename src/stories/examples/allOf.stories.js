import {
    materialRenderers,
    materialCells,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import { allOf as exampleData } from '@jsonforms/examples'; 

export default {
  title: 'Jsonforms Examples/allOf',
  component: JsonForms,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
  }
};

export const Primary = {
  args: {
    // assign schema if example has one
    ...( exampleData.schema ? { schema: exampleData.schema } : {} ),
    ...( exampleData.uischema ? { uischema: exampleData.uischema } : {} ),
    ...( exampleData.data ? { data: exampleData.data } : {} ),
    renderers: [ ...materialRenderers ],
    cells: [ ...materialCells ]
  },
};
