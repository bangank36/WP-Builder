import React from "react";
import isEmpty from 'lodash/isEmpty';
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isStringControl, and, optionIs } from "@jsonforms/core";
import {
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalHStack as HStack,
	__experimentalZStack as ZStack,
	__experimentalDropdownContentWrapper as DropdownContentWrapper,
	TabPanel,
	ColorIndicator,
	Flex,
	FlexItem,
	Dropdown,
	Button,
  ColorPalette, SlotFillProvider, Popover
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
		<FlexItem
			className="block-editor-panel-color-gradient-settings__color-name"
			title={ label }
		>
			{ label }
		</FlexItem>
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
      <LabeledColorIndicators
        indicators={ ['#ccc'] }
        label={ label }
      />
      <SlotFillProvider>
        <ColorPalette
          colors={ colors }
          value={ data }
          onChange={ ( value ) => 
            handleChange(path, value === '' ? undefined : value)
          }
        />
        <Popover.Slot />
      </SlotFillProvider>
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
