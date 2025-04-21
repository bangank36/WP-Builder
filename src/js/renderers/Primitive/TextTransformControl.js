import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { 
    rankWith, 
    isStringControl,
    and,
    optionIs
} from "@jsonforms/core";
import { 
    __experimentalVStack as VStack,
	Tooltip,	
    FlexItem
} from '@wordpress/components';
import { __experimentalTextTransformControl as TextTransformControl } from '@wordpress/block-editor'; 
import styled from '@emotion/styled';

    const HiddenLabelFormTokenFieldWrapper = styled( FlexItem )`
		legend {
			display: none;
		}
	`;

const TextControl = ( props ) => {
	const {
		id,
		description,
		label,
		path,
		data,
		visible,
		handleChange
	} = props;

	return !visible ? null : (
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
				<HiddenLabelFormTokenFieldWrapper>
					<TextTransformControl
                        value={ data || '' }
						onChange={ ( value ) =>
							handleChange( path, value === '' ? undefined : value )
						}
                    /> 
				</HiddenLabelFormTokenFieldWrapper>
			</VStack>
		</>
	)
};

export const textTransformControlTester = rankWith(
	5, //increase rank as needed
	and( isStringControl, optionIs( 'format', 'text-transform' ) )
);

export default withJsonFormsControlProps( TextControl );
