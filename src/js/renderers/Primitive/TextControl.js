import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isStringControl } from "@jsonforms/core";
import { 
	TextControl as UiTextControl,
    __experimentalVStack as VStack,
	Tooltip,	
    FlexItem
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
				<UiTextControl
					value={ data || '' }
					onChange={ ( value ) =>
						handleChange( path, value === '' ? undefined : value )
					}
				/> 
            </FlexItem>
        </VStack>
    </>
  )
};

export const textControlTester = rankWith(
	4, //increase rank as needed
	isStringControl
);

export default withJsonFormsControlProps( TextControl );
