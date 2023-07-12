import isEmpty from 'lodash/isEmpty';
import {
  findUISchema,
  Generate,
  isObjectControl,
  rankWith,
} from '@jsonforms/core';
import { 
  JsonFormsDispatch, 
  withJsonFormsDetailProps,
 } from '@jsonforms/react';
import React, { useMemo, useContext, useEffect } from 'react';
import { Context as NavigatorContext } from '../component/context'

import { chevronLeft, chevronRight } from '@wordpress/icons';
import { isRTL, __ } from '@wordpress/i18n';
import { IconWithCurrentColor } from './NavigatorLayout/icon-with-current-color';
import { NavigationButtonAsItem } from './NavigatorLayout/navigation-button';

import {
	__experimentalHStack as HStack,
	FlexItem,
} from '@wordpress/components';

export const GutenbergObjectRenderer = ({
  renderers,
  cells,
  uischemas,
  schema,
  label,
  path,
  visible,
  enabled,
  uischema,
  rootSchema,
}) => {
  const detailUiSchema = useMemo(
    () =>
      findUISchema(
        uischemas,
        schema,
        uischema.scope,
        path,
        () =>
          isEmpty(path)
            ? Generate.uiSchema(schema, 'VerticalLayout')
            : { ...Generate.uiSchema(schema, 'Group'), label },
        uischema,
        rootSchema
      ),
    [uischemas, schema, uischema.scope, path, label, uischema, rootSchema]
  );

  // Util to convert dot path into slash path: eg: address.country -> /address/country
  const route = '/' + path.split('.').join('/');

  const [screenContent, setScreenContent] = useContext(NavigatorContext);

  //UseEffect to fix the issue Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate.
  useEffect(() => {
    if (!route) {
      return;
    }
    // Use the callback since the new state is based on the previous state
    setScreenContent(prevScreenContent => ({
      ...prevScreenContent,
      [route]: {
        component: ({
          renderers,
          cells,
          uischemas,
          schema,
          label,
          path,
          visible,
          enabled,
          uischema: detailUiSchema,
          rootSchema,
        }),
        label: detailUiSchema.label,
        path: path
      }
    }))
  }, [route])

  return !visible ? null : (
    <>
      <NavigationButtonAsItem
        path={route}
        aria-label={detailUiSchema.label}
      >
        <HStack justify="space-between">
          <FlexItem>
            {detailUiSchema.label}
          </FlexItem>
          <IconWithCurrentColor
            icon={isRTL() ? chevronLeft : chevronRight}
          />
        </HStack>
      </NavigationButtonAsItem>
    </>
  )
};

export const gutenbergObjectControlTester = rankWith(
  9,
  isObjectControl
);

export default withJsonFormsDetailProps(GutenbergObjectRenderer);
