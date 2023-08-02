import React from "react";
import merge from "lodash/merge";
import { 
    isOneOfEnumControl, 
    rankWith 
} from "@jsonforms/core";
import { withJsonFormsOneOfEnumProps } from "@jsonforms/react";

import { isDescriptionHidden } from "@jsonforms/core";
import {
    __experimentalVStack as VStack,
	Tooltip,	
    FlexItem,
    SelectControl,
    ComboboxControl
} from '@wordpress/components';

export const GutenbergComboboxOneOf = props => {
	const {
		config,
		id,
		label,
		required,
		description,
		errors,
		data,
		visible,
		options,
		handleChange,
		path,
		enabled
	} = props
	const focused = true;
	const isValid = errors.length === 0
	const appliedUiSchemaOptions = merge({}, config, props.uischema.options)
	const showDescription = !isDescriptionHidden(
		visible,
		description,
		focused,
		appliedUiSchemaOptions.showUnfocusedDescription
	)
	const onChange = ( value ) => handleChange( path, value );

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
				<FlexItem>
                    { appliedUiSchemaOptions.autocomplete === false ? (
                        <SelectControl
                            value={ data }
                            onChange={ onChange }
                            options={ [
                                {
                                    disabled: true,
                                    label: 'Select an Option',
                                    value: ''
                                },
                                ...options
                            ] }
                        />
                    ) : (
                        <ComboboxControl
                            value={ data }
                            onChange={ onChange }
                            options={ [
                                ...options
                            ] }
                            allowReset={ false }
                        />
                    ) }
				</FlexItem>
			</VStack>
		</>
	)
}

export const GutenbergComboboxControl = props => {
  	return <GutenbergComboboxOneOf {...props} />
}

export const gutenbergComboboxOneOfTester = rankWith(
	8,
	isOneOfEnumControl
)
export default withJsonFormsOneOfEnumProps( GutenbergComboboxControl )
