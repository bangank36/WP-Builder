import React from "react";
import isEmpty from 'lodash/isEmpty';
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isStringControl, and, optionIs } from "@jsonforms/core";
import {
	__experimentalHStack as HStack,
	__experimentalZStack as ZStack,
	__experimentalDropdownContentWrapper as DropdownContentWrapper,
  	__experimentalSpacer as Spacer,
	ColorIndicator,
	Flex,
	FlexItem,
	Dropdown,
	Button,
	ColorPalette, 
	SlotFillProvider, 
	Popover,
	HorizontalRule
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
		errors,
		label,
		uischema,
		path,
		visible,
		required,
		config,
		data,
		input,
		handleChange
  	} = props;
  
  	const colors = uischema.options.colors || [
		{ name: 'red', color: '#f00' },
		{ name: 'white', color: '#fff' },
		{ name: 'blue', color: '#00f' },
  	];

  return ( 
    <>
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
							<ColorPalette
								colors={ colors }
								value={ data }
								onChange={ ( value ) => 
									handleChange( path, value === '' ? undefined : value )
								}
							/>
							<Popover.Slot />
						</SlotFillProvider>
					</DropdownContentWrapper>
				) }
				/>
          	</FlexItem>
        </HStack>
        <Spacer marginTop={ 1 } marginBottom={ 1 }>
          	<HorizontalRule />
        </Spacer>
    </>
  )
};

  const optionIsNotEmpty =
  (optionName) =>
  (uischema) => {
    if (isEmpty(uischema)) {
      return false;
    }

    const options = uischema.options;
    return !isEmpty(options) && !isEmpty(options[optionName]);
  };

export const colorPaletteControlTester = rankWith(
  6, //increase rank as needed
  and(isStringControl, optionIs('format', 'color'), optionIsNotEmpty('colors'))
);

export default withJsonFormsControlProps(TextControl);

//or(formatIs('date-time'), optionIs('format', 'date-time'))