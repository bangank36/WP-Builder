import isEmpty from 'lodash/isEmpty';
import {
  findUISchema,
  Generate,
  isObjectControl,
  RankedTester,
  rankWith,
  StatePropsOfControlWithDetail,
} from '@jsonforms/core';
import { 
  JsonFormsDispatch, 
  withJsonFormsDetailProps,
 } from '@jsonforms/react';
import { Hidden } from '@mui/material';
import React, { useMemo } from 'react';

import {
  __experimentalNavigatorProvider as NavigatorProvider,
  __experimentalNavigatorScreen as NavigatorScreen,
  __experimentalNavigatorButton as NavigatorButton,
  __experimentalNavigatorToParentButton as NavigatorToParentButton,
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

  // Extract object prop 
  const userProp = detailUiSchema.label === 'User' ? true : false;

  return (
    <Hidden xsUp={!visible}>
      {!userProp ? (<JsonFormsDispatch
        visible={visible}
        enabled={enabled}
        schema={schema}
        uischema={detailUiSchema}
        path={path}
        renderers={renderers}
        cells={cells}
      />) : (
        <NavigatorButton path='/address/user'>
          Go to User
        </NavigatorButton>
      )}
    </Hidden>
  );
};

export const gutenbergObjectControlTester = rankWith(
  9,
  isObjectControl
);

export default withJsonFormsDetailProps(GutenbergObjectRenderer);