import React from "react";
import isEmpty from 'lodash/isEmpty';
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isStringControl, and, optionIs } from "@jsonforms/core";
import { ColorPalette, SlotFillProvider, Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';

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
