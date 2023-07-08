import React from "react"
import isEmpty from 'lodash/isEmpty';
import { rankWith, uiTypeIs, findUISchema, Generate } from "@jsonforms/core"
// import { MaterialLayoutRenderer } from "./NavigatorRenderer"
import { 
    JsonFormsDispatch,
    withJsonFormsLayoutProps 
} from "@jsonforms/react"

import { Grid, Hidden } from "@mui/material"

import {
    __experimentalNavigatorProvider as NavigatorProvider,
    __experimentalNavigatorScreen as NavigatorScreen,
    __experimentalNavigatorButton as NavigatorButton,
    __experimentalNavigatorToParentButton as NavigatorToParentButton,
} from '@wordpress/components';

/**
 * Default tester for a vertical layout.
 * @type {RankedTester}
 */
export const gutenbergNavigatorLayoutTester = rankWith(
  2,
  uiTypeIs("NavigatorLayout")
)

export const renderLayoutElements = (
  elements,
  schema,
  path,
  enabled,
  renderers,
  cells
) => {
  return elements.map((child, index) => (
    <Grid item key={`${path}-${index}`} xs>
      <JsonFormsDispatch
        uischema={child}
        schema={schema}
        path={path}
        enabled={enabled}
        renderers={renderers}
        cells={cells}
      />
    </Grid>
  ))
}

const MaterialLayoutRendererComponent = ({
  visible,
  elements,
  schema,
  path,
  enabled,
  direction,
  renderers,
  cells
}) => {
  if (isEmpty(elements)) {
    return null
  } else {
    return (
      <Hidden xsUp={!visible}>
        <Grid
          container
          direction={direction}
          spacing={direction === "row" ? 2 : 0}
        >
          {renderLayoutElements(
            elements,
            schema,
            path,
            enabled,
            renderers,
            cells
          )}
        </Grid>
      </Hidden>
    )
  }
}
export const MaterialLayoutRenderer = React.memo(
  MaterialLayoutRendererComponent
)

export const GutenbergNavigatorlLayoutRenderer = ({
  uischema,
  schema,
  path,
  enabled,
  visible,
  renderers,
  cells
}) => {
    // nit: move this method into seperate file
    /*
     * Recursive method to get all the `object` type property and return them as { path, key }
     * Note: so far the method skips the root node, and only looking inside the `properties` prop
    */
    const getObjectProperties = (obj, parentPath = '') => {
        const result = [];
      
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            const path = parentPath ? `${parentPath}/${key}` : `/${key}`;
            // Convert the slash-string into dot-string, eg: /address/user - address.user
            const dotPath = path.replace(/^\//, '').replace(/\//g, '.');
            const prop = obj[key];
      
            if (prop.type === 'object') {
              result.push({ path, key, dotPath });
              // result.push(...getObjectProperties(prop.properties, path));
            }
          }
        }
      
        return result;
    };

    const navigatableProps = getObjectProperties(schema.properties);

    // The navigatorLayout should be the root layout
    const navigatorLayout = uischema

    const childProps = {
        elements: navigatorLayout.elements,
        schema,
        path,
        enabled,
        direction: "column",
        visible
    }

  return (
    <>
        {/* <MaterialLayoutRenderer
            {...childProps}
            renderers={renderers}
            cells={cells}
        /> */}
        <NavigatorProvider initialPath="/">
            <NavigatorScreen path="/">
                <p>This is the home screen.</p>
                {navigatableProps.filter((({dotPath}) => dotPath.split(".").length < 2 )).map(({path, key, dotPath}, index) => (
                    <NavigatorButton path={`${path}`}>
                        <p>Go to <strong>{key}</strong> screen. {dotPath}</p>
                    </NavigatorButton>
                ))}
            </NavigatorScreen>

            {navigatableProps.map(({path, key, dotPath}, index) => (
                    <NavigatorScreen path={`${path}`}>
                        <p>This is the <strong>{key}</strong> screen. {dotPath}</p>
                        <NavigatorToParentButton>
                            Go back
                        </NavigatorToParentButton>
                        <NavigatorButton path="/">
                            <p>Go to home</p>
                        </NavigatorButton>
                    <JsonFormsDispatch
                        uischema={navigatorLayout.elements[0].elements[index]}
                        schema={schema}
                        path={dotPath}
                        enabled={enabled}
                            renderers={renderers}
                            cells={cells}
                        />
                    </NavigatorScreen>
            ))}
        
        </NavigatorProvider>
    </>
  )
}

export default withJsonFormsLayoutProps(GutenbergNavigatorlLayoutRenderer)
