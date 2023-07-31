import React from "react";
import isEmpty from 'lodash/isEmpty';

import { rankWith, uiTypeIs } from "@jsonforms/core";
import { withJsonFormsLayoutProps } from "@jsonforms/react";

import { GutenbergLayoutRenderer } from "./LayoutRenderer";
import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Text,
	__experimentalHeading as Heading,
} from '@wordpress/components';
  

/**
 * Default tester for a vertical layout.
 * @type {RankedTester}
 */
export const gutenbergGroupLayoutTester = rankWith(
  	4,
  	uiTypeIs("GroupLayout")
)

export const GutenbergGroupLayoutRenderer = ( {
	uischema,
	schema,
	path,
	enabled,
	visible,
	renderers,
	cells,
	label
} ) => {
  	const groupLayout = uischema
  	const childProps = {
		elements: groupLayout.elements,
		schema,
		path,
		enabled,
		direction: "column",
		visible,
		label
	}

	return !visible ? null : (
		<Card>
			{ ! isEmpty( label ) && (
				<CardHeader>
					<Heading level={ 4 }>{ label }</Heading>
				</CardHeader>
			) }
			<CardBody>
				<GutenbergLayoutRenderer
					{ ...childProps }
					renderers={ renderers }
					cells={ cells }
				/>
			</CardBody>
		</Card>
	)
}

export default withJsonFormsLayoutProps( GutenbergGroupLayoutRenderer )
