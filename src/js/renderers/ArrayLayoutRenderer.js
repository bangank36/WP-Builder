import range from "lodash/range"
import React from 'react';
import {
	Helpers
} from "@jsonforms/core";
import {
  withJsonFormsArrayControlProps
} from "@jsonforms/react";
import { resolvePathToRoute } from './util';

import { dragHandle } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { IconWithCurrentColor } from './NavigatorLayout/icon-with-current-color';
import { NavigationButtonAsItem } from './NavigatorLayout/navigation-button';

import {
	__experimentalUseNavigator as useNavigator,
	__experimentalHStack as HStack,
    __experimentalItemGroup as ItemGroup,
	__experimentalItem as Item,
	FlexItem,
} from '@wordpress/components';

// Import shared components
import { 
	ItemMovers, 
	ItemActionsMenu, 
	AddItemButton,
} from './array-utils';

export const ArrayControl = ( {
	classNames,
	data,
	label,
	path,
	schema,
	errors,
	addItem,
	removeItems,
	moveUp,
	moveDown,
	draggable,
	labelItemAttribute
} ) => {
	const navigator = useNavigator();

	const route = resolvePathToRoute(path);

  	return (
    	<div>
      		<div>{errors}</div>
	  		<ItemGroup 
                isBordered={false} 
                isSeparated={true}
                size="small"
            >
                { ( data ) ? (
                    range( 0, data.length ).map(( index ) => {
                        return (
                            <Item key={ index }>
								<HStack justify="space-between">
									<FlexItem>
										{ draggable ? <IconWithCurrentColor
											icon={ dragHandle }
										/> : <ItemMovers
										moveUpEnable={ index > 0 }
										onMoveUp={ () => moveUp( path, index )() }
										moveDownEnable={ index < data.length - 1 }
										onMoveDown={ () => moveDown( path, index )() }
									/>}
									</FlexItem>
									<NavigationButtonAsItem
										style={{ flex: 1 }}
										path={ `${ route }/${ index }` }
										aria-label={ `Item #${ index }` }
									>
										{ labelItemAttribute && data[ index ] && data[ index ][ labelItemAttribute ] ? data[ index ][ labelItemAttribute ] : `item #${ index }` }
									</NavigationButtonAsItem>
									<ItemActionsMenu 
										onEdit={ () => navigator.goTo( `${ route }/${ index }` ) }
										onRemove={ () => {
											if (
												window.confirm(
													"Are you sure you wish to delete this item?"
												)
											) {
												removeItems( path, [index] )()
											}
										} }
										onDuplicate={() => {
											addItem( path, data[ index ] )();
											navigator.goTo( `${ route }/${ data.length }` );
										} }
									/>
								</HStack>
                            </Item>
                        )
                    } ) 
                ) : null }
				<Item>
					<AddItemButton 
						schema={ schema }
						label={ label } 
						path={ path }
						addItem={ addItem }
						onClick={ () => navigator.goTo( `${ route }/${ data?.length || 0 }` ) }
					/>
				</Item>
            </ItemGroup>
    	</div>
  	)
}

export const ArrayControlRenderer = ( props ) => {
  	const {
		schema,
		uischema,
		data,
		path,
		rootSchema,
		uischemas,
		addItem,
		getStyle,
		getStyleAsClassName = (cls) => cls,
		removeItems,
		moveUp,
		moveDown,
		id,
		visible,
		enabled,
		errors,
		translations
	} = props
	
	const controlElement = uischema
	const labelDescription = Helpers.createLabelDescriptionFrom(
		controlElement,
		schema
	)
  	const label = labelDescription.show ? labelDescription.text : ""
	const controlClassName = `control ${Helpers.convertToValidClassName(
		controlElement.scope
	)}`
  	const fieldSetClassName = getStyleAsClassName("array.layout")
  	const buttonClassName = getStyleAsClassName("array.button")
  	const childrenClassName = getStyleAsClassName("array.children")
	const classNames = {
			wrapper: controlClassName,
			fieldSet: fieldSetClassName,
			button: buttonClassName,
			children: childrenClassName
	}

 	return (
		<ArrayControl
			classNames={classNames}
			data={data}
			label={label}
			path={path}
			schema={schema}
			errors={errors}
			addItem={addItem}
			removeItems={removeItems}
			moveUp={moveUp}
			moveDown={moveDown}
			uischema={uischema}
			uischemas={uischemas}
			getStyleAsClassName={getStyleAsClassName}
			rootSchema={rootSchema}
			id={id}
			visible={visible}
			enabled={enabled}
			getStyle={getStyle}
			translations={translations}
		/>
  	)
}

export default withJsonFormsArrayControlProps(ArrayControlRenderer)
