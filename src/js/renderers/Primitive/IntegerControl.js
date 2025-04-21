import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isIntegerControl } from "@jsonforms/core";
import {
    __experimentalNumberControl as NumberControl,
    __experimentalVStack as VStack,
	__experimentalText as Text,
    FlexItem,
	__experimentalSpacer as Spacer
} from '@wordpress/components';

const IntegerControl = ( props ) => {
	const {
		id,
		description,
		label,
		path,
		data,
		visible,
        schema,
		handleChange
	} = props;

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
						<NumberControl
							value={ Number(data || schema.default) }
							onChange={ ( value ) =>
								handleChange( path, value === '' ? undefined : value )
							}
                        spinControls={ "custom" }
                        min={ schema.minimum }
                        max={ schema.maximum }
                        step={ schema.multipleOf || 1 }
					/>
					</FlexItem>
				</VStack>
			</Spacer>
		</>
	)
};

export const integerControlTester = rankWith(
	4, //increase rank as needed
	isIntegerControl
);

export default withJsonFormsControlProps( IntegerControl );
