import React, { useState } from "react";
import { 
    rankWith, 
    uiTypeIs, 
    composePaths
} from "@jsonforms/core";
import { 
    withJsonFormsLayoutProps,
    JsonFormsDispatch,
} from "@jsonforms/react"
import { Context as NavigatorContext } from '../component/context'
import { __ } from '@wordpress/i18n';
import {
    __experimentalNavigatorProvider as NavigatorProvider,
    __experimentalNavigatorScreen as NavigatorScreen,
    __experimentalUseNavigator as useNavigator,
	CardBody,
	Card,
} from '@wordpress/components';

import { GutenbergLayoutRenderer } from "./layouts/LayoutRenderer";
import ArrayControlRenderer from "./ArrayLayoutRenderer";
import NavigatorTopToolbar from './NavigatorLayout/navigator-top-toolbar';

/**
 * Default tester for a vertical layout.
 * @type {RankedTester}
 */
export const gutenbergNavigatorLayoutTester = rankWith(
    2,
    uiTypeIs("NavigatorLayout")
)

const MemoizedChildComponent = ( ( { rendererProps, label, path, contentType } ) => {
    const navigator = useNavigator();

    // Handle array renderer
    if ( contentType === 'array' ) {
        return (
            <ArrayControlRenderer { ...rendererProps }/>
        )
    }

    if ( navigator.params.index ) {
        const childPath = composePaths( path, `${ navigator.params.index }` );
        const childRendererProps = {
            ...rendererProps,
            path: childPath
        }

        return <JsonFormsDispatch { ...childRendererProps }/>
    }

    return <JsonFormsDispatch { ...rendererProps }/>
})

MemoizedChildComponent.whyDidYouRender = true

export const GutenbergNavigatorlLayoutRenderer = ( {
    uischema,
    schema,
    path,
    enabled,
    visible,
    renderers,
    cells
} ) => {
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
    const [ screenContent, setScreenContent ] = useState( {} )
    
    return (
      <>
        <NavigatorContext.Provider value={[screenContent, setScreenContent]}>
          <NavigatorProvider initialPath="/">
                { screenContent.hasOwnProperty("/") ? null : (
                    <NavigatorScreen path="/">
                        <Card
                            size="small"
                            isBorderless
                            className="jsonforms-navigator-layout-screen"
                        >
                            <CardBody>
                                <GutenbergLayoutRenderer
                                    { ...childProps }
                                    renderers={ renderers }
                                    cells={ cells }
                                />
                            </CardBody>
                        </Card>
                    </NavigatorScreen>
                ) }

                { Object.keys( screenContent ).map((  route, index ) => (
                    <NavigatorScreen path={ `${route}` } key={ index }>
                        <Card
                            size="small"
                            isBorderless
                            className="jsonforms-navigator-layout-screen"
                        >
                        <CardBody>
                            { route !== '/' ? (
                                <NavigatorTopToolbar/>
                            ) : null }
                            <MemoizedChildComponent {...screenContent[route]} />
                        </CardBody>
                        </Card>
                    </NavigatorScreen>
                ) ) }
            </NavigatorProvider>
        </NavigatorContext.Provider>
      </>
    )
}

export default withJsonFormsLayoutProps(GutenbergNavigatorlLayoutRenderer)
