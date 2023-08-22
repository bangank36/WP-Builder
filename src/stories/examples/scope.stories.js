import { materialRenderers, materialCells } from "@jsonforms/material-renderers";
import { vanillaCells, vanillaRenderers } from '@jsonforms/vanilla-renderers';
import { gutenbergRenderers } from '../../js/renderers';
import { JsonForms } from "@jsonforms/react";
import { scope as exampleData } from '@jsonforms/examples'; 

export default {
  title: 'Jsonforms Examples/scope',
  component: JsonForms,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    schema: { 
      control: false,
      description: 'The JSON Schema describing the underlying data to the form.'
    },
    uischema: {
      control: false,
      description: 'A JSON describing the layout of the form.'
    },
    data: {
      control: false,
      description: 'Represents an object containing the data to be rendered in the form.'
    },
    renderers: {
      control: false,
      description: 'Available renderers that are used by JSON Forms when rendering.'
    },
    cells: {
      control: false,
      description: 'Renderers-alike but only represent the data to be displayed and nothing else.'
    }
  }
};

export const ReactMaterial = {
  args: {
    ...( exampleData.schema ? { schema: exampleData.schema } : {} ),
    ...( exampleData.uischema ? { uischema: exampleData.uischema } : {} ),
    ...( exampleData.data ? { data: exampleData.data } : {} ),
    renderers: [ ...materialRenderers ],
    cells: [ ...materialCells ]
  },
};

export const ReactVanilla = {
  args: {
    ...( exampleData.schema ? { schema: exampleData.schema } : {} ),
    ...( exampleData.uischema ? { uischema: exampleData.uischema } : {} ),
    ...( exampleData.data ? { data: exampleData.data } : {} ),
    renderers: [ ...vanillaRenderers ],
    cells: [ ...vanillaCells ]
  },
};

export const GutenbergRenderers = {
  args: {
    ...( exampleData.schema ? { schema: exampleData.schema } : {} ),
    ...( exampleData.uischema ? exampleData.uischema : {} ),
    ...( exampleData.data ? { data: exampleData.data } : {} ),
    renderers: [ ...gutenbergRenderers ],
    cells: [ ...vanillaCells ]
  },
};

