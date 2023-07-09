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
import React, { useMemo, useContext, useEffect } from 'react';
import { Context as NavigatorContext } from '../component/context'

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

  // Util to convert dot path into slash path: eg: address.country -> /address/country
  const route = '/' + path.split('.').join('/');

  const [screenContent, setScreenContent] = useContext(NavigatorContext);

  //UseEffect to fix the issue Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate.
  useEffect(() => {
    // Use the callback since the new state is based on the previous state
    setScreenContent(prevScreenContent => ({
      ...prevScreenContent,
      [route]: {
        component: (<JsonFormsDispatch
          visible={visible}
          enabled={enabled}
          schema={schema}
          uischema={detailUiSchema}
          path={path}
          renderers={renderers}
          cells={cells}
        />),
        label: detailUiSchema.label,
        path: path
      }
    }))
  }, [route])

  return (
    <Hidden xsUp={!visible}>
      <>
        <NavigatorButton path={route}>
          Go to {detailUiSchema.label} {path}
        </NavigatorButton>
      </>
    </Hidden>
  );
};

export const gutenbergObjectControlTester = rankWith(
  9,
  isObjectControl
);

export default withJsonFormsDetailProps(GutenbergObjectRenderer);
