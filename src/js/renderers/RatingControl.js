import React from "react";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { rankWith, scopeEndsWith, isStringControl } from "@jsonforms/core";
import { TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

const RatingControl = (props) => {
  const {
    id,
    description,
    errors,
    label,
    uischema,
    visible,
    required,
    config,
    input,
  } = props;

  return ( <TextControl
    help={description}
    label={label}
    onChange={function noRefCheck(){}}
    value=""
  /> )
};

export const ratingControlTester = rankWith(
  4, //increase rank as needed
  isStringControl
);

export default withJsonFormsControlProps(RatingControl);
