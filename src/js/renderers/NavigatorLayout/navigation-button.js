import React from 'react';
/**
 * WordPress dependencies
 */
import {
	__experimentalNavigatorButton as NavigatorButton,
	__experimentalNavigatorToParentButton as NavigatorToParentButton,
	__experimentalItem as Item,
	FlexItem,
	__experimentalHStack as HStack,
	__experimentalSpacer as Spacer,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { IconWithCurrentColor } from './icon-with-current-color';

function GenericNavigationButton( { icon, children, ...props } ) {
	return (
		<Item { ...props }>
			{ icon && (
				<HStack justify="flex-start">
					<IconWithCurrentColor icon={ icon } size={ 24 } />
					<FlexItem>{ children }</FlexItem>
				</HStack>
			) }
			{ ! icon && children }
		</Item>
	);
}

function NavigationButtonAsItem( props ) {
	return (
		<Spacer paddingY={ 2 }>
			<NavigatorButton as={ GenericNavigationButton } { ...props } style={ { padding: 0 } } />
		</Spacer>
	);
}

function NavigationBackButtonAsItem( props ) {
	return (
		<Spacer paddingY={ 2 }>
			<NavigatorToParentButton as={ GenericNavigationButton } { ...props } style={ { padding: 0 } } />
		</Spacer>
	);
}

export { NavigationButtonAsItem, NavigationBackButtonAsItem };
