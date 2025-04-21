import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isBooleanControl, optionIs, and } from "@jsonforms/core";
import {
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
	CheckboxControl as UiCheckboxControl,
	__experimentalText as Text,
    FlexItem,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';

const CheckboxControl = (props) => {
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
				<HStack justify="space-between">
					<FlexItem>
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
					</FlexItem>
					<FlexItem>
						<UiCheckboxControl
							checked={ !!data }
							onChange={( value ) =>
								handleChange( path, value === '' ? undefined : value )
							}
						/>
					</FlexItem>
				</HStack>
			</Spacer>
		</>
  	)
};

export const booleanCheckboxControlTester = rankWith(
	5, //increase rank as needed
	and( isBooleanControl, optionIs( 'toggle', false ) )
);

export default withJsonFormsControlProps( CheckboxControl );
