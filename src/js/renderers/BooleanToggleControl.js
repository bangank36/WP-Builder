import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isBooleanControl, optionIs, and } from "@jsonforms/core";
import { FormToggle } from '@wordpress/components';

const ToggleControl = (props) => {
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
    <FormToggle
      checked={ !!data }
      onChange={(event) =>
        handleChange(path, !event ? undefined : event.target.checked)
      }
    />
  )
};

export const booleanToggleControlTester = rankWith(
  5, //increase rank as needed
  and(isBooleanControl, optionIs('toggle', true))
);

export default withJsonFormsControlProps(ToggleControl);
