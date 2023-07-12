import React, { useState } from "react"
import { rankWith, uiTypeIs, } from "@jsonforms/core"
import { MaterialLayoutRenderer } from "./NavigatorRenderer"
import { 
    withJsonFormsLayoutProps 
} from "@jsonforms/react"

import { Context as NavigatorContext } from '../component/context'

import { chevronLeft, chevronRight, home } from '@wordpress/icons';
import { isRTL, __ } from '@wordpress/i18n';
import { IconWithCurrentColor } from './NavigatorLayout/icon-with-current-color';
import { NavigationButtonAsItem } from './NavigatorLayout/navigation-button';

import {
    __experimentalNavigatorProvider as NavigatorProvider,
    __experimentalNavigatorScreen as NavigatorScreen,
    __experimentalNavigatorToParentButton as NavigatorToParentButton,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
    __experimentalHeading as Heading,
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
    const screenContentMemo = React.useMemo(() => {
        const screenContent = {}
        navigatorLayout.elements.forEach((element) => {
            const { path, component, label } = element
            screenContent[path] = { component, label }
        })
        return screenContent
    }, [navigatorLayout.elements])
    React.useEffect(() => {
        setScreenContent(screenContentMemo)
    }, [screenContentMemo])

    const MemoizedChildComponent = (({children}) => {
        console.log('render', children) // only one time render, because it children memoized in parent component inside useMemo hook. children: [object, object, object]
        return <div>{children}</div>
    })

    return (
      <>
        <NavigatorContext.Provider value={[screenContent, setScreenContent]}>
          <NavigatorProvider initialPath="/">
              <NavigatorScreen path="/">
                    <Card
                        size="small"
                        isBorderless
                        className="jsonforms-navigator-layout-screen"
                    >
                        <CardBody>
                            <MaterialLayoutRenderer
                                {...childProps}
                                renderers={renderers}
                                cells={cells}
                            />
                        </CardBody>
                    </Card>
                </NavigatorScreen>

                {Object.keys( screenContent ).map(( route, index ) => (
                    <NavigatorScreen path={ `${route}` }>
                        <Card
                            size="small"
                            isBorderless
                            className="jsonforms-navigator-layout-screen"
                        >
                        <CardBody>
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
                            <MemoizedChildComponent>
                            { screenContent[route].component }
                            </MemoizedChildComponent>
                            
                           
                        </CardBody>
                        </Card>
                    </NavigatorScreen>
                ))}
            </NavigatorProvider>
        </NavigatorContext.Provider>
      </>
    )
}

export default withJsonFormsLayoutProps(GutenbergNavigatorlLayoutRenderer)
