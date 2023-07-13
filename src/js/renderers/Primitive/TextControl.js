import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isStringControl } from "@jsonforms/core";
import { TextControl as UiTextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

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
    <UiTextControl
      help={description}
      label={label}
      value={data || ''}
      onChange={(value) =>
        handleChange(path, value === '' ? undefined : value)
      }
    /> 
  )
};

export const textControlTester = rankWith(
  4, //increase rank as needed
  isStringControl
);

export default withJsonFormsControlProps(TextControl);
