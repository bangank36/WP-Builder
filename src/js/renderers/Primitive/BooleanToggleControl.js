import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isBooleanControl } from "@jsonforms/core";
import { ToggleControl as UiToggleControl } from '@wordpress/components';

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
    <UiToggleControl
        checked={ !!data }
        help={description}
        label={label}
        onChange={(value) =>
            handleChange(path, value === '' ? undefined : value)
        }
    />
  )
};

export const booleanToggleControlTester = rankWith(
  4, //increase rank as needed
  isBooleanControl
);

export default withJsonFormsControlProps(ToggleControl);
