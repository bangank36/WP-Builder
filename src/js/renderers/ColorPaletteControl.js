import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, isStringControl, and, optionIs } from "@jsonforms/core";
import { ColorPalette } from '@wordpress/components';
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
  
  const colors = [
    { name: 'red', color: '#f00' },
    { name: 'white', color: '#fff' },
    { name: 'blue', color: '#00f' },
  ];

  return ( 
    <ColorPalette
      colors={ colors }
      value={ data }
      onChange={ ( color ) => handleChange( color ) }
    />
  )
};

export const colorPaletteControlTester = rankWith(
  6, //increase rank as needed
  and(isStringControl, optionIs('format', 'color'))
);

export default withJsonFormsControlProps(TextControl);
