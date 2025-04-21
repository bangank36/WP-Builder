import React from 'react';
import { RangeControl, __experimentalText as Text } from '@wordpress/components';
import { withJsonFormsControlProps } from '@jsonforms/react';
import {
  __experimentalVStack as VStack,
  FlexItem,
  __experimentalSpacer as Spacer,
} from '@wordpress/components';

const SliderControl = ({ data, visible, handleChange, path, schema, id, label, description }) => {
  // Get min, max, and step from schema or use defaults
  const min = schema.minimum !== undefined ? schema.minimum : 0;
  const max = schema.maximum !== undefined ? schema.maximum : 20000;
  const step = schema.multipleOf !== undefined ? schema.multipleOf : 1000;

  return !visible ? null : (
    <Spacer paddingY={2} marginBottom={0}>
      <VStack spacing={0}>
        <FlexItem>
          <label htmlFor={id}>
            {label || schema.title}
          </label>
        </FlexItem>
        {(description || schema.description) && (
          <FlexItem>
            <Text variant="muted" style={{ fontSize: '12px', color: '#757575' }}>
              {description || schema.description}
            </Text>
          </FlexItem>
        )}
        <FlexItem>
          <RangeControl
            value={Number(data)}
            onChange={(value) => handleChange(path, value)}
            min={min}
            max={max}
            step={step}
            withInputField={true}
            showTooltip={true}
          />
        </FlexItem>
      </VStack>
    </Spacer>
  );
};

export default withJsonFormsControlProps(SliderControl);