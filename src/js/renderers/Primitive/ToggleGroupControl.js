import React from "react"
import { and, isEnumControl, formatIs, rankWith } from "@jsonforms/core"
import { withJsonFormsEnumProps } from "@jsonforms/react"

import merge from "lodash/merge"
import { showAsRequired, isDescriptionHidden } from "@jsonforms/core"
import {
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
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
  const onChange = (_ev, value) => handleChange(path, value)

  return !visible ? null : (
    <>
        <ToggleGroupControl label="my label" value="vertical" isBlock>
            <ToggleGroupControlOption value="horizontal" label="Horizontal" />
            <ToggleGroupControlOption value="vertical" label="Vertical" />
        </ToggleGroupControl>
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
