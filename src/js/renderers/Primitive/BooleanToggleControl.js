import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isBooleanControl } from "@jsonforms/core";
import {
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
	FormToggle,
	__experimentalText as Text,
    FlexItem,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';

const ToggleControl = (props) => {
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
						<FormToggle
							checked={ !!data }
							onChange={(event) =>
								handleChange(path, event.target.checked || false)
							}
						/>
					</FlexItem>
				</HStack>
			</Spacer>
		</>
  	)
};

export const booleanToggleControlTester = rankWith(
	4, //increase rank as needed
	isBooleanControl
);

export default withJsonFormsControlProps(ToggleControl);
