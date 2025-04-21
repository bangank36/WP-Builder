import React, { useContext } from "react"
import { chevronLeft, chevronRight, home } from '@wordpress/icons';
import { isRTL, __ } from '@wordpress/i18n';
import { IconWithCurrentColor } from './icon-with-current-color';
import { NavigationButtonAsItem } from './navigation-button';
import { Context as NavigatorContext } from '../NavigatorContext';

import {
    __experimentalNavigatorToParentButton as NavigatorToParentButton,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
    __experimentalHeading as Heading,
    __experimentalUseNavigator as useNavigator,
} from '@wordpress/components';

export const NavigatorTopToolbarRenderer = () => {
    const [ screenContent ] = useContext(NavigatorContext);
    const navigator = useNavigator();

    // Get the current path from the navigator
    const currentPath = navigator.location.path;

    // Find the screen title for the current path
    const screenTitle = screenContent[currentPath]?.label || __('Back');

    return (
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
                {screenTitle}
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
    )
}

export default React.memo(NavigatorTopToolbarRenderer)
