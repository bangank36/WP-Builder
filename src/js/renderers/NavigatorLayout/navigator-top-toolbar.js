import React from "react"
import { chevronLeft, chevronRight, home } from '@wordpress/icons';
import { isRTL, __ } from '@wordpress/i18n';
import { IconWithCurrentColor } from './icon-with-current-color';
import { NavigationButtonAsItem } from './navigation-button';

import {
    __experimentalNavigatorToParentButton as NavigatorToParentButton,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
    __experimentalHeading as Heading,
} from '@wordpress/components';

export const NavigatorTopToolbarRenderer = () => {
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
                Back
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
