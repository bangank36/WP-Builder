import range from "lodash/range"
import React from 'react';
import {
	createDefaultValue,
	Helpers
} from "@jsonforms/core";
import {
  withJsonFormsArrayControlProps
} from "@jsonforms/react";
import { resolvePathToRoute } from './util';

import { 
	plus,
	moreVertical, 
	edit, 
	copy, 
	trash,
	chevronUp,
	chevronDown,
	dragHandle
} from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { IconWithCurrentColor } from './NavigatorLayout/icon-with-current-color';
import { NavigationButtonAsItem } from './NavigatorLayout/navigation-button';

import {
	__experimentalUseNavigator as useNavigator,
	__experimentalHStack as HStack,
	__experimentalVStack as VStack,
    __experimentalItemGroup as ItemGroup,
	__experimentalItem as Item,
	DropdownMenu, 
	MenuGroup, 
	MenuItem,
	FlexItem,
	Button
} from '@wordpress/components';

const ItemActionsMenu = ( { onEdit, onDuplicate, onRemove } ) => (
    <DropdownMenu icon={ moreVertical } label="Select an action">
        { () => (
            <>
                <MenuGroup>
                    <MenuItem icon={ edit } onClick={ onEdit }>
                        Edit
                    </MenuItem>
                    <MenuItem icon={ copy } onClick={ onDuplicate }>
                        Duplicate
                    </MenuItem>
                </MenuGroup>
                <MenuGroup>
                    <MenuItem icon={ trash } onClick={ onRemove }>
                        Remove
                    </MenuItem>
                </MenuGroup>
            </>
        ) }
    </DropdownMenu>
);

const ItemMovers = ( { moveUpEnable, onMoveUp, moveDownEnable, onMoveDown } ) => {
	return (
		<VStack
			style={ {
				gap: 0
			} }
		>
			<Button
				style={ { 
					height: '12px',
					boxSizing: 'border-box',
					padding: '6px 12px'
				} }
				size={ 'small' }
				icon={ chevronUp }
				aria-label={ `Move item up` }
				onClick={ onMoveUp }
				disabled={ ! moveUpEnable }
			>
			</Button>
			<Button
				style={ { 
					height: '12px',
					boxSizing: 'border-box',
					padding: '6px 12px'
				} }
				size={ 'small' }
				icon={ chevronDown }
				aria-label={ `Move item down` }
				onClick={ onMoveDown }
				disabled={ ! moveDownEnable }
			>
			</Button>	
		</VStack>
	);
}

const AddItemButton = ({ route, path, label, schema, addItem }) => {
	const navigator = useNavigator();
	
	return (
		<Button
			aria-label={ `Add new item` }
			onClick={ () => {
				addItem( path, createDefaultValue(schema) )();
				navigator.goTo( route );
			} }
		>
			<HStack 
				justify="center"
			>
			<FlexItem>
				<IconWithCurrentColor
					icon={ plus }
				/>Add { label }
			</FlexItem>
			</HStack>
		</Button>
	);
}

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
	draggable
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
										item #{ index }
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
						route={ `${ route }/${ data?.length || 0 }` } 
						addItem={ addItem }
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
