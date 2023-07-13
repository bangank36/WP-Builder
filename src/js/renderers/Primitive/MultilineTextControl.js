import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isMultiLineControl } from "@jsonforms/core";
import { TextareaControl } from '@wordpress/components';

const TextControl = (props) => {
  const {
    id,
    description,
    errors,
    label,
    uischema,
    path,
    visible,
    required,
    config,
    data,
    input,
    handleChange
  } = props;
  
  return ( 
    <TextareaControl
      help={description}
      label={label}
      value={data || ''}
      onChange={(value) =>
        handleChange(path, value === '' ? undefined : value)
      }
      rows={4}
    /> 
  )
};

export const multilineTextControlTester = rankWith(
  5, //increase rank as needed
  isMultiLineControl
);

export default withJsonFormsControlProps(TextControl);
