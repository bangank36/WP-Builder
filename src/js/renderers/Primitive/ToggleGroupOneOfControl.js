import React from "react";
import merge from "lodash/merge";
import {
    and,
    isOneOfEnumControl,
    formatIs,
    rankWith
} from "@jsonforms/core";
import { withJsonFormsOneOfEnumProps } from "@jsonforms/react";

import { isDescriptionHidden } from "@jsonforms/core";
import {
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
    __experimentalVStack as VStack,
	__experimentalSpacer as Spacer,
	__experimentalText as Text,
    FlexItem,
} from '@wordpress/components';

export const GutenbergToggleGroupOneOf = props => {
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
  const onChange = ( value ) => handleChange( path, value )

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
                        { options.map( ( option ) => (
                            <ToggleGroupControlOption
                                value={ option.value }
                                key={ option.label }
                                label={ option.label }
                                disabled={ !enabled }
                            />
                        ) ) }
                    </ToggleGroupControl>
                </FlexItem>
            </VStack>
        </Spacer>
    </>
  )
}

export const GutenbergToggleGroupOneOfControl = props => {
  return <GutenbergToggleGroupOneOf {...props} />
}

export const gutenbergToggleGroupOneOfTester = rankWith(
  9,
  and( isOneOfEnumControl, formatIs( "toggle-group" ) )
)
export default withJsonFormsOneOfEnumProps( GutenbergToggleGroupOneOfControl )
