import React, { useState } from "react"
import { 
    rankWith, 
    uiTypeIs, 
    composePaths
} from "@jsonforms/core"
import { MaterialLayoutRenderer } from "./NavigatorRenderer"
import { 
    withJsonFormsLayoutProps,
    JsonFormsDispatch 
} from "@jsonforms/react"

import range from 'lodash/range';

import { Context as NavigatorContext } from '../component/context'

import { chevronLeft, chevronRight, home } from '@wordpress/icons';
import { isRTL, __ } from '@wordpress/i18n';
import { IconWithCurrentColor } from './NavigatorLayout/icon-with-current-color';
import { NavigationButtonAsItem } from './NavigatorLayout/navigation-button';

import {
    __experimentalNavigatorProvider as NavigatorProvider,
    __experimentalNavigatorScreen as NavigatorScreen,
    __experimentalNavigatorToParentButton as NavigatorToParentButton,
    __experimentalUseNavigator as useNavigator,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
    __experimentalHeading as Heading,
    FlexItem,
	CardBody,
	Card,
} from '@wordpress/components';

/**
 * Default tester for a vertical layout.
 * @type {RankedTester}
 */
export const gutenbergNavigatorLayoutTester = rankWith(
    2,
    uiTypeIs("NavigatorLayout")
)

const MemoizedChildComponent = (({ component, label, path } ) => {
    const navigator = useNavigator();
    console.log(navigator.params);

    // Below 2 conditions are hard coded to handle the array renderers
    if (navigator.location.path === '/address/comments') {
        return (
            component.data ? (
                range(0, component.data.length).map((index) => {
                    const childPath = composePaths(path, `${index}`);
                    return (
                        <NavigationButtonAsItem
                            path={`${navigator.location.path}/${index}`}
                            aria-label={label}
                        >
                            <HStack justify="space-between">
                                <FlexItem>
                                    item #{index}
                                </FlexItem>
                                <IconWithCurrentColor
                                    icon={isRTL() ? chevronLeft : chevronRight}
                                />
                            </HStack>
                        </NavigationButtonAsItem>
                    )
                }) 
            ) : null
        )
    }
    if (navigator.params.index) {
        const childPath = composePaths(path, `${navigator.params.index}`);
        const childComp = {
            ...component,
            path: childPath
        }

        return <JsonFormsDispatch {...childComp}/>
    }

    return <JsonFormsDispatch {...component}/>
})

MemoizedChildComponent.whyDidYouRender = true


export const GutenbergNavigatorlLayoutRenderer = ({
    uischema,
    schema,
    path,
    enabled,
    visible,
    renderers,
    cells
}) => {
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
    const [screenContent, setScreenContent] = useState({})
    
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

                {Object.keys( screenContent ).map((  route, index ) => (
                    <NavigatorScreen path={ `${route}` }>
                        <Card
                            size="small"
                            isBorderless
                            className="jsonforms-navigator-layout-screen"
                        >
                        <CardBody>
                            { route !== '/' ? (
                                <HStack spacing={ 2 }>
                                    <NavigatorToParentButton
                                        style={
                                            // TODO: This style override is also used in ToolsPanelHeader.
                                            // It should be supported out-of-the-box by Button.
                                            { minWidth: 24, padding: 0 }
                                        }
                                        icon={ isRTL() ? chevronRight : chevronLeft }
                                        isSmall
                                        aria-label={ __( 'Navigate to the previous view' ) }
                                    />
                                    <Spacer>
                                        <Heading
                                        className="jsonforms-navigator-screen-header"
                                        level={ 2 }
                                        size={ 13 }
                                        >
                                        { screenContent[route].label }
                                        </Heading>
                                    </Spacer>
                
                                    <NavigationButtonAsItem
                                        path={'/'}
                                        aria-label={ __( 'Navigate to the main view' ) }
                                    >
                                        <HStack justify="flex-end">
                                        <IconWithCurrentColor
                                            icon={ home }
                                        />
                                        </HStack>
                                    </NavigationButtonAsItem>
                                </HStack>
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
