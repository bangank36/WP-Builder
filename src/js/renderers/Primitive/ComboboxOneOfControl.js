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
	__experimentalText as Text,
    FlexItem,
    SelectControl,
    ComboboxControl,
	__experimentalSpacer as Spacer
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
			<Spacer paddingY={ 2 } marginBottom={ 0 }>
				<VStack justify="space-between">
					<VStack spacing={0}>
						<FlexItem>
							<label htmlFor={ id }>
								{ label }
							</label>
						</FlexItem>
						{description && (
							<FlexItem>
								<Text variant="muted" style={{ fontSize: '12px', color: '#757575' }}>
									{description}
								</Text>
							</FlexItem>
						)}
					</VStack>
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
			</Spacer>
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
