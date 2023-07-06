/*
  The MIT License
  
  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
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
  useJsonForms
 } from '@jsonforms/react';
import { Hidden } from '@mui/material';
import React, { useMemo } from 'react';

import {
  __experimentalNavigatorProvider as NavigatorProvider,
  __experimentalNavigatorScreen as NavigatorScreen,
  __experimentalNavigatorButton as NavigatorButton,
  __experimentalNavigatorToParentButton as NavigatorToParentButton,
} from '@wordpress/components';

export const MaterialObjectRenderer = ({
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

  const ctx = useJsonForms();

  const pathComp = path.split(".");
  const formScreens = [];
  
  // For each object prop, we render a NavigatorScreen
  if (schema.type === "object") {
    formScreens.push({
      path: path
    })
  }

  console.log(ctx);

  return (
    <Hidden xsUp={!visible}>
      <NavigatorProvider initialPath="/">
        {pathComp.length ? (
          <>
            <NavigatorScreen path="/">
              <p>This is the main screen. {uischema.scope}</p>
              <NavigatorButton path="/child">
                Navigate to detail screen. {uischema.scope}
              </NavigatorButton>
            </NavigatorScreen>

            <NavigatorScreen path="/child">
              <JsonFormsDispatch
                visible={visible}
                enabled={enabled}
                schema={schema}
                uischema={detailUiSchema}
                path={path}
                renderers={renderers}
                cells={cells}
              />
              <p>This is the child screen.</p>
              <NavigatorToParentButton>
                Go back
              </NavigatorToParentButton>
            </NavigatorScreen>
          </>
        ) : (
          <JsonFormsDispatch
            visible={visible}
            enabled={enabled}
            schema={schema}
            uischema={detailUiSchema}
            path={path}
            renderers={renderers}
            cells={cells}
          />
        )}
        
      </NavigatorProvider>
    </Hidden>
    
  );
};

export const gutenbergObjectControlTester = rankWith(
  5,
  isObjectControl
);

export default withJsonFormsDetailProps(MaterialObjectRenderer);
