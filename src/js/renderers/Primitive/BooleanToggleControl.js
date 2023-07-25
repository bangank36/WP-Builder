import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isBooleanControl } from "@jsonforms/core";
import {
	__experimentalHStack as HStack,
	FormToggle,
	Tooltip,	
    FlexItem,
	__experimentalSpacer as Spacer,
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
			<Spacer paddingY={ 2 } marginBottom={ 0 }>
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
			</Spacer>
		</>
  	)
};

export const booleanToggleControlTester = rankWith(
	4, //increase rank as needed
	isBooleanControl
);

export default withJsonFormsControlProps(ToggleControl);
