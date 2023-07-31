import React from "react";
import { rankWith, uiTypeIs } from "@jsonforms/core";
import { GutenbergLayoutRenderer } from "./LayoutRenderer";
import { withJsonFormsLayoutProps } from "@jsonforms/react";

/**
 * Default tester for a vertical layout.
 * @type {RankedTester}
 */
export const gutenbergVerticalLayoutTester = rankWith(
  	4,
  	uiTypeIs("VerticalLayout")
)

export const GutenbergVerticalLayoutRenderer = ( {
	uischema,
	schema,
	path,
	enabled,
	visible,
	renderers,
	cells
} ) => {
  	const verticalLayout = uischema
  	const childProps = {
		elements: verticalLayout.elements,
		schema,
		path,
		enabled,
		direction: "column",
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

export default withJsonFormsLayoutProps( GutenbergVerticalLayoutRenderer )
