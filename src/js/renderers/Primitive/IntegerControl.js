import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isIntegerControl } from "@jsonforms/core";
import { 
    __experimentalNumberControl as NumberControl,
    __experimentalVStack as VStack,
	Tooltip,	
    FlexItem
} from '@wordpress/components';

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
						value={ Number(data || schema.default) }
						onChange={ ( value ) =>
							handleChange( path, value === '' ? undefined : value )
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

export const integerControlTester = rankWith(
	4, //increase rank as needed
	isIntegerControl
);

export default withJsonFormsControlProps( IntegerControl );
