import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isStringControl } from "@jsonforms/core";
import {
	TextControl as UiTextControl,
    __experimentalVStack as VStack,
	__experimentalText as Text,
    FlexItem,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';

const TextControl = ( props ) => {
	const {
		id,
		description,
		label,
		path,
		data,
		visible,
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
						<UiTextControl
							value={ data || '' }
							onChange={ ( value ) =>
								handleChange( path, value === '' ? undefined : value )
							}
						/>
					</FlexItem>
				</VStack>
			</Spacer>
		</>
	)
};

export const textControlTester = rankWith(
	4, //increase rank as needed
	isStringControl
);

export default withJsonFormsControlProps( TextControl );
