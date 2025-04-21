import React from "react";
import merge from "lodash/merge";
import {
    and,
	or,
    isEnumControl,
    formatIs,
	optionIs,
    rankWith
} from "@jsonforms/core";
import { withJsonFormsEnumProps } from "@jsonforms/react";

import { isDescriptionHidden } from "@jsonforms/core";
import {
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
    __experimentalVStack as VStack,
	__experimentalText as Text,
    FlexItem,
	__experimentalSpacer as Spacer
} from '@wordpress/components';

export const GutenbergToggleGroup = props => {
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
						<ToggleGroupControl
							value={ data }
							isBlock
							onChange={ onChange }
						>
							{options.map( ( option ) => (
								<ToggleGroupControlOption
									value={ option.value }
									key={ option.label }
									label={ option.label }
									disabled={ !enabled }
								/>
							))}
						</ToggleGroupControl>
					</FlexItem>
				</VStack>
			</Spacer>
		</>
	)
}

export const GutenbergToggleGroupControl = props => {
  	return <GutenbergToggleGroup {...props} />
}

export const gutenbergToggleGroupTester = rankWith(
	9,
	and(
		isEnumControl,
		or(formatIs('toggle-group'), optionIs('format', 'toggle-group'))
	)
)
export default withJsonFormsEnumProps( GutenbergToggleGroupControl )
