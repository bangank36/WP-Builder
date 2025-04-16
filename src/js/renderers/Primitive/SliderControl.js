import React from 'react';
import { RangeControl } from '@wordpress/components';
import { withJsonFormsControlProps } from '@jsonforms/react';

const SliderControl = ({ data, handleChange, path, schema }) => {
  // Get min, max, and step from schema or use defaults
  const min = schema.minimum !== undefined ? schema.minimum : 0;
  const max = schema.maximum !== undefined ? schema.maximum : 20000;
  const step = schema.multipleOf !== undefined ? schema.multipleOf : 1000;

  return (
    <RangeControl
      label={schema.title || schema.label}
      value={Number(data)}
      onChange={(value) => handleChange(path, value)}
      min={min}
      max={max}
      step={step}
      help={schema.description}
    />
  );
};

export default withJsonFormsControlProps(SliderControl);