import React from "react";
import { rankWith, uiTypeIs } from "@jsonforms/core";
import { GutenbergLayoutRenderer } from "./LayoutRenderer";
import { withJsonFormsLayoutProps } from "@jsonforms/react";

/**
 * Default tester for a Horizontal layout.
 * @type {RankedTester}
 */
export const gutenbergHorizontalLayoutTester = rankWith(
  	4,
  	uiTypeIs("HorizontalLayout")
)

export const GutenbergHorizontalLayoutRenderer = ( {
	uischema,
	schema,
	path,
	enabled,
	visible,
	renderers,
	cells
} ) => {
  	const horizontalLayout = uischema
  	const childProps = {
		elements: horizontalLayout.elements,
		schema,
		path,
		enabled,
		direction: "row",
		visible
	}

	return (
		<GutenbergLayoutRenderer
			{...childProps}
			renderers={renderers}
			cells={cells}
		/>
	)
}

export default withJsonFormsLayoutProps( GutenbergHorizontalLayoutRenderer )
