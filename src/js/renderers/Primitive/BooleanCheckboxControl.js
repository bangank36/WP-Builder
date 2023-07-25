import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isBooleanControl, optionIs, and } from "@jsonforms/core";
import {
	__experimentalHStack as HStack,
	CheckboxControl as UiCheckboxControl,
	Tooltip,	
    FlexItem,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';

const CheckboxControl = (props) => {
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
						<UiCheckboxControl
							checked={ !!data }
							onChange={( value ) =>
								handleChange( path, value === '' ? undefined : value )
							}
						/>
					</FlexItem>
				</HStack>
			</Spacer>
		</>
  	)
};

export const booleanCheckboxControlTester = rankWith(
	5, //increase rank as needed
	and( isBooleanControl, optionIs( 'toggle', false ) )
);

export default withJsonFormsControlProps( CheckboxControl );
