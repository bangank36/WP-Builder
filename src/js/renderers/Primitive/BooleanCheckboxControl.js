import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isBooleanControl, optionIs, and } from "@jsonforms/core";
import { CheckboxControl as UiCheckboxControl } from '@wordpress/components';

const CheckboxControl = (props) => {
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
    <UiCheckboxControl
        checked={ !!data }
        help={description}
        label={label}
        onChange={(value) =>
            handleChange(path, value === '' ? undefined : value)
        }
    />
  )
};

export const booleanCheckboxControlTester = rankWith(
  4, //increase rank as needed
  isBooleanControl
);

export default withJsonFormsControlProps(CheckboxControl);
