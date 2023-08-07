import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isNumberControl } from "@jsonforms/core";
import { 
    __experimentalNumberControl as NumberControl,
    __experimentalVStack as VStack,
	Tooltip,	
    FlexItem
} from '@wordpress/components';
import { useDebouncedChange } from "../util";

const toNumber = value => ( value === "" ? undefined : parseFloat( value ) )
const eventToValue = ev => {
	return toNumber( ev.target.value );
}

const IntegerControl = ( props ) => {
	const {
		id,
		description,
		label,
		path,
		data,
        schema,
		handleChange
	} = props;

	const [ inputValue, onChange ] = useDebouncedChange(
		handleChange,
		data || schema.default,
		data,
		path,
		eventToValue
	);
  
	return ( 
		<>
			<VStack justify="space-between">
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
					<NumberControl
						value={ inputValue }
						onChange={ ( value, eventParam ) => {
							// The eventParam according to the documentation of Number Control 
							// https://github.com/WordPress/gutenberg/blob/b56fadd89409a22b5a717a8a2f67a7438782ac1a/packages/components/src/number-control/index.tsx#L202
							const { event } = eventParam;
							onChange( event );
						}
							
						}
                        spinControls={ "custom" }
                        min={ schema.minimum }
                        max={ schema.maximum }
                        step={ schema.multipleOf || 1 }
					/> 
				</FlexItem>
			</VStack>
		</>
	)
};

export const numberControlTester = rankWith(
	4, //increase rank as needed
	isNumberControl
);

export default withJsonFormsControlProps( IntegerControl );
