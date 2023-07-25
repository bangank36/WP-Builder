import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isMultiLineControl } from "@jsonforms/core";
import { 
	__experimentalVStack as VStack,
	Tooltip,	
	FlexItem,
	TextareaControl
} from '@wordpress/components';

const TextControl = ( props ) => {
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
				<TextareaControl
					value={ data || '' }
					onChange={( value ) =>
						handleChange( path, value === '' ? undefined : value )
					}
					rows={4}
				/> 
            </FlexItem>
        </VStack>
    </>
  )
};

export const multilineTextControlTester = rankWith(
	5, //increase rank as needed
	isMultiLineControl
);

export default withJsonFormsControlProps( TextControl );
