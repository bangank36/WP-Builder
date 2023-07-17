import React, { useState } from "react";
import range from 'lodash/range';
import { 
    rankWith, 
    uiTypeIs, 
    composePaths
} from "@jsonforms/core";
import { 
    withJsonFormsLayoutProps,
    JsonFormsDispatch 
} from "@jsonforms/react"
import { Context as NavigatorContext } from '../component/context'
import { chevronLeft, chevronRight } from '@wordpress/icons';
import { isRTL, __ } from '@wordpress/i18n';
import {
    __experimentalNavigatorProvider as NavigatorProvider,
    __experimentalNavigatorScreen as NavigatorScreen,
    __experimentalUseNavigator as useNavigator,
	__experimentalHStack as HStack,
    FlexItem,
	CardBody,
	Card,
} from '@wordpress/components';

import { MaterialLayoutRenderer } from "./NavigatorRenderer";
import { IconWithCurrentColor } from './NavigatorLayout/icon-with-current-color';
import { NavigationButtonAsItem } from './NavigatorLayout/navigation-button';
import NavigatorTopToolbar from './NavigatorLayout/navigator-top-toolbar';

/**
 * Default tester for a vertical layout.
 * @type {RankedTester}
 */
export const gutenbergNavigatorLayoutTester = rankWith(
    2,
    uiTypeIs("NavigatorLayout")
)

const MemoizedChildComponent = ( ( { component, label, path } ) => {
    const navigator = useNavigator();
    console.log('screen rerendered');

    // Below 2 conditions are hard coded to handle the array renderers
    if ( navigator.location.path === '/address/comments' ) {
        return (
            component.data ? (
                range( 0, component.data.length ).map(( index ) => {
                    return (
                        <NavigationButtonAsItem
                            path={ `${ navigator.location.path }/${ index }` }
                            aria-label={label}
                        >
                            <HStack justify="space-between">
                                <FlexItem>
                                    item #{index}
                                </FlexItem>
                                <IconWithCurrentColor
                                    icon={ isRTL() ? chevronLeft : chevronRight}
                                />
                            </HStack>
                        </NavigationButtonAsItem>
                    )
                }) 
            ) : null
        )
    }
    if (navigator.params.index) {
        const childPath = composePaths( path, `${ navigator.params.index }` );
        const childComp = {
            ...component,
            path: childPath
        }

        return <JsonFormsDispatch { ...childComp }/>
    }

    return <JsonFormsDispatch { ...component }/>
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
    // use memo for the screenContent and setScreenContent context value
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
                                <MaterialLayoutRenderer
                                    { ...childProps }
                                    renderers={ renderers }
                                    cells={ cells }
                                />
                            </CardBody>
                        </Card>
                    </NavigatorScreen>
                ) }

                { Object.keys( screenContent ).map((  route, index ) => (
                    <NavigatorScreen path={ `${route}` }>
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
