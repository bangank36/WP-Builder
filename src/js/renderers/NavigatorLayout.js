import React from "react"
import { rankWith, uiTypeIs } from "@jsonforms/core"
import { MaterialLayoutRenderer } from "./NavigatorRenderer"
import { withJsonFormsLayoutProps } from "@jsonforms/react"

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

    // Hard code: grab all `object` type properties
    const propertiesArr = Object.keys(schema.properties);
    propertiesArr.filter((key) => {
        return schema.properties[key]?.type === 'object'
    });

    
    const verticalLayout = uischema

    const childProps = {
        elements: verticalLayout.elements,
        schema,
        path,
        enabled,
        direction: "column",
        visible
    }

  return (
    <>
        <NavigatorProvider initialPath="/">
            <NavigatorScreen path="/">
            <p>This is the home screen.</p>
            {propertiesArr.map((propKey, index) => (
                <NavigatorButton path={`/${propKey}`}>
                    <p>Go to <strong>{propKey}</strong> screen.</p>
                </NavigatorButton>
            ))}
            <MaterialLayoutRenderer
                {...childProps}
                renderers={renderers}
                cells={cells}
            />
            </NavigatorScreen>

            {propertiesArr.map((propKey, index) => (
                <NavigatorScreen path={`/${propKey}`}>
                    <p>This is the <strong>{propKey}</strong> screen.</p>
                    <NavigatorToParentButton>
                        Go back
                    </NavigatorToParentButton>
                </NavigatorScreen>
            ))}
        
        </NavigatorProvider>
    </>
  )
}

export default withJsonFormsLayoutProps(GutenbergNavigatorlLayoutRenderer)
