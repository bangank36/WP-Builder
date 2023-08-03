import {
	and,
	hasType,
	rankWith,
	schemaMatches,
	schemaSubPathMatches,
	uiTypeIs
} from "@jsonforms/core";
  
import { withJsonFormsMultiEnumProps } from "@jsonforms/react";
import xorBy from "lodash/xorBy";
import React from "react";

import { 
	FormTokenField,
	__experimentalVStack as VStack,
	Tooltip,	
    FlexItem,
} from '@wordpress/components';

import styled from '@emotion/styled';

export const GutenbergEnumArrayRenderer = ( {
	schema,
	visible,
	errors,
	path,
	options,
	data,
	addItem,
	removeItem,
	handleChange: _handleChange,
	description,
	id,
	label
} ) => {

	const HiddenLabelFormTokenFieldWrapper = styled( FlexItem )`
		.components-form-token-field__label {
			display: none;
		}
	`;

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
					<FormTokenField
						onChange={ ( tokens ) => {
							// Get distinct value between tokens and data (both ways) and check wether the value is belong to data or not, of yes, then use addItem, otherwise, use removeItem
							const distinctTokens = xorBy( tokens, data );
							if ( distinctTokens.length > 0 ) {
								const value = distinctTokens[ 0 ];
								if ( data.includes( value ) ) {
									removeItem( path, value );
								} else {
									addItem( path, value );
								}
							}
						} }
						suggestions={ options.map( ( option ) => option.value ) }
						value={ data }
						__experimentalShowHowTo={ false }
						__nextHasNoMarginBottom={ true }
						__experimentalExpandOnFocus={ true }
					/>
				</HiddenLabelFormTokenFieldWrapper>
			</VStack>
		</>
	)
}

const hasOneOfItems = schema =>
	schema.oneOf !== undefined &&
	schema.oneOf.length > 0 &&
	schema.oneOf.every(entry => {
		return entry.const !== undefined
	})

const hasEnumItems = schema =>
	schema.type === "string" && schema.enum !== undefined

export const gutenbergEnumArrayRendererTester = rankWith(
	10,
	and(
		uiTypeIs( "Control" ),
		and(
			schemaMatches(
				schema =>
				hasType( schema, "array" ) &&
				!Array.isArray( schema.items ) &&
				schema.uniqueItems === true
			),
			schemaSubPathMatches( "items", schema => {
				return hasOneOfItems( schema ) || hasEnumItems( schema )
			} )
		)
	)
)

export default withJsonFormsMultiEnumProps( GutenbergEnumArrayRenderer )
  