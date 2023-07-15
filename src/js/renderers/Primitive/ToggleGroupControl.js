import React from "react";
import merge from "lodash/merge";
import { 
    and, 
    isEnumControl, 
    formatIs, 
    rankWith 
} from "@jsonforms/core";
import { withJsonFormsEnumProps } from "@jsonforms/react";

import { isDescriptionHidden } from "@jsonforms/core";
import {
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
    __experimentalVStack as VStack,
	__experimentalSpacer as Spacer,
	Tooltip,	
    FlexItem,
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
  const onChange = ( value ) => handleChange( path, value )

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
                <ToggleGroupControl 
                    value={ data }
                    isBlock
                    onChange={ onChange }
                >
                    {options.map((option) => (
                        <ToggleGroupControlOption 
                            value={option.value}
                            key={option.label}
                            label={option.label}
                            disabled={!enabled}
                        />
                    ))}
                </ToggleGroupControl>
            </FlexItem>
        </VStack>
    </>
  )
}

export const GutenbergToggleGroupControl = props => {
  return <GutenbergToggleGroup {...props} />
}

export const gutenbergToggleGroupTester = rankWith(
  21,
  and(isEnumControl, formatIs("toggle-group"))
)
export default withJsonFormsEnumProps(GutenbergToggleGroupControl)
