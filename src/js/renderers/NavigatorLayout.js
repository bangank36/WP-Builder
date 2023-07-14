import React, { useState, useMemo } from "react"
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
    __experimentalNavigatorButton as NavigatorButton,
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


export const GutenbergNavigatorlLayoutRenderer = (props) => {
    const controls = useMemo(() => generateControls(props.schema), [props.schema]);
    return (
        <NavigatorProvider initialPath="/">
            <NavigatorScreen path="/">
                <p>{props.label}</p>
                {Object.keys(props.schema.properties).map((propertyKey) => (
                    <NavigatorButton path={`/${propertyKey}`} key={propertyKey}>
                        Navigate to {propertyKey}.
                    </NavigatorButton>
                ))}
            </NavigatorScreen>
            {Object.keys(props.schema.properties).map((propertyKey) => (
                <NavigatorScreen path={`/${propertyKey}`} key={propertyKey}>
                    <JsonFormsDispatch schema={props.schema} uischema={controls[propertyKey]} path={props.path} />
                </NavigatorScreen>
            ))}
        </NavigatorProvider>
    );
};

const generateControls = (schema) => {
    const result = {};
    Object.keys(schema.properties).forEach(key => {
        result[key] = { type: 'Control', scope: `#/properties/${(key)}` };
    });
    return result;
}

export default withJsonFormsLayoutProps(GutenbergNavigatorlLayoutRenderer)
