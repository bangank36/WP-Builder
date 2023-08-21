import { materialRenderers, materialCells } from "@jsonforms/material-renderers";
import { vanillaCells, vanillaRenderers } from '@jsonforms/vanilla-renderers';
import { gutenbergRenderers } from '../../js/renderers';
import { JsonForms } from "@jsonforms/react";
import { radioGroupExample as exampleData } from '@jsonforms/examples'; 

export default {
  title: 'Jsonforms Examples/radioGroupExample',
  component: JsonForms,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {

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

