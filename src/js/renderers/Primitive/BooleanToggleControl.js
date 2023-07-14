import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isBooleanControl } from "@jsonforms/core";
import {
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
	FormToggle,
	Tooltip,	
    FlexItem,
	HorizontalRule
} from '@wordpress/components';

const ToggleControl = (props) => {
  	const {
		id,
		description,
		label,
		path,
		data,
		handleChange
	} = props;
  
  	return ( 
		<>
			<HStack justify="space-between">
				<FlexItem>
				{ description ? (
					<Tooltip text={ description }>
					<label htmlFor={ id }>
						{ label }
					</label>
				</Tooltip>
				) : ( 
					<label htmlFor={ id }>
						{ label }
					</label> 
				) }
				</FlexItem>
				<FlexItem>
					<FormToggle
						checked={ !!data }
						onChange={(event) =>
							handleChange(path, event.target.checked || false)
						}
					/>
				</FlexItem>
			</HStack>
			<Spacer marginTop={2} marginBottom={0}>
				<HorizontalRule />
			</Spacer>
		</>
  	)
};

export const booleanToggleControlTester = rankWith(
	4, //increase rank as needed
	isBooleanControl
);

export default withJsonFormsControlProps(ToggleControl);
