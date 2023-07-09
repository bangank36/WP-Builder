import React, { createContext, useState, useEffect } from "react"
import isEmpty from 'lodash/isEmpty';
import { rankWith, uiTypeIs, findUISchema, Generate } from "@jsonforms/core"
import { MaterialLayoutRenderer } from "./NavigatorRenderer"
import { 
    JsonFormsDispatch,
    withJsonFormsLayoutProps 
} from "@jsonforms/react"

import { Context as NavigatorContext } from '../component/context'

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

export const GutenbergNavigatorlLayoutRenderer = ({
  uischema,
  schema,
  path,
  enabled,
  visible,
  renderers,
  cells
}) => {
    /*
     * Recursive method to get all the `object` type property and return them as { path, key }
     * Note: so far the method skips the root node, and only looking inside the `properties` prop
    */
   // nit: move this method into seperate file
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
              result.push(...getObjectProperties(prop.properties, path));
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

    // Update screenContent with correct `path` and `JsonFormDispatch` component
    const [screenContent, setScreenContent] = useState({})

  return (
    <>
      <NavigatorContext.Provider value={[screenContent, setScreenContent]}>
        <NavigatorProvider initialPath="/">
            <NavigatorScreen path="/">
                <p>This is the home screen.</p>
                <MaterialLayoutRenderer
                  {...childProps}
                  renderers={renderers}
                  cells={cells}
                />
            </NavigatorScreen>

            {Object.keys( screenContent ).map(( route, index ) => (
                <NavigatorScreen path={ `${route}` } key={ `${route}` }>
                    <p>This is the <strong>{ screenContent[route].label }</strong> screen. { screenContent[route].path }</p>
                    <NavigatorToParentButton>
                        Go back
                    </NavigatorToParentButton>
                    <NavigatorButton path="/">
                        <p>Go to home</p>
                    </NavigatorButton>
                    { screenContent[route].component }
                </NavigatorScreen>
            ))}
        </NavigatorProvider>
        
      </NavigatorContext.Provider>
    </>
  )
}

export default withJsonFormsLayoutProps(GutenbergNavigatorlLayoutRenderer)
