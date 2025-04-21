import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { 
	rankWith, 
	isStringControl, 
	and, 
	or, 
	optionIs,
	formatIs
} from "@jsonforms/core";
import {
	__experimentalHStack as HStack,
	__experimentalZStack as ZStack,
	__experimentalDropdownContentWrapper as DropdownContentWrapper,
	ColorIndicator,
	Flex,
	FlexItem,
	Dropdown,
	Button,
	ColorPalette, 
	ColorPicker,
	SlotFillProvider, 
	Popover,
	Tooltip,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';

const LabeledColorIndicators = ( { indicators, label } ) => (
	<HStack justify="flex-start">
		<ZStack isLayered={ false } offset={ -8 }>
			{ indicators.map( ( indicator, index ) => (
				<Flex key={ index } expanded={ false }>
					<ColorIndicator colorValue={ indicator } />
				</Flex>
			) ) }
		</ZStack>
	</HStack>
);

const TextControl = (props) => {
  	const {
		id,
		description,
		label,
		uischema,
		path,
		data,
		visible,
		handleChange
  	} = props;
  
  	const colors = uischema.options?.colors;

	return !visible ? null : ( 
		<>
			<Spacer paddingY={ 2 } marginBottom={ 0 }>
				<HStack justify="space-between">
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
						<Dropdown
							popoverProps={ {
								placement: 'left-start',
								offset: 36,
								shift: true,
							} }
							className="my-container-class-name"
							contentClassName="my-dropdown-content-classname"
							renderToggle={ ( { isOpen, onToggle } ) => (
								<Button
									onClick={ onToggle }
									aria-expanded={ isOpen }
								>
									<LabeledColorIndicators
										indicators={ [ data ] }
										label={ label }
									/>
								</Button>
							) }
							renderContent={ () => (
								<DropdownContentWrapper paddingSize="none">
									<SlotFillProvider>
										{
											!colors || colors.length === 0 ? (
												<ColorPicker 
													onChange={ ( value ) => 
														handleChange( path, value === '' ? undefined : value )
													} 
												/>
											) : (
												<ColorPalette
													colors={ colors }
													value={ data }
													onChange={ ( value ) => 
														handleChange( path, value === '' ? undefined : value )
													}
												/>
											)
										}
										<Popover.Slot />
									</SlotFillProvider>
								</DropdownContentWrapper>
							) }
						/>
					</FlexItem>
				</HStack>
			</Spacer>
		</>
	)
};

export const colorPaletteControlTester = rankWith(
  6, //increase rank as needed
  and( isStringControl, or( formatIs( 'color' ), optionIs( 'format', 'color' ) ) )
);

export default withJsonFormsControlProps(TextControl);
