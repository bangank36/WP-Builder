import range from "lodash/range"
import React, { useMemo } from 'react';
import {
	composePaths,
	createDefaultValue,
	findUISchema,
	Helpers
} from "@jsonforms/core"
import {
  JsonFormsDispatch,
  withJsonFormsArrayControlProps
} from "@jsonforms/react"

import { 
	chevronLeft, 
	chevronRight, 
	plus,
	moreVertical, 
	edit, 
	copy, 
	trash 
} from '@wordpress/icons';
import { isRTL, __ } from '@wordpress/i18n';
import { IconWithCurrentColor } from './NavigatorLayout/icon-with-current-color';
import { NavigationButtonAsItem } from './NavigatorLayout/navigation-button';

import {
	__experimentalUseNavigator as useNavigator,
	__experimentalHStack as HStack,
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
                <MenuGroup
					style={ { width: 200 } }
				>
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

const { convertToValidClassName } = Helpers

// TODO: add new item button component
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
	uischema,
	uischemas,
	getStyleAsClassName = (cls) => cls,
	renderers,
	rootSchema,
	translations
} ) => {
	const navigator = useNavigator();

  	const controlElement = uischema
  	const childUiSchema = useMemo(
		() =>
		findUISchema(
			uischemas,
			schema,
			uischema.scope,
			path,
			undefined,
			uischema,
			rootSchema
		),
		[ uischemas, schema, uischema.scope, path, uischema, rootSchema ]
	)
  	const isValid = errors.length === 0
  	const validationClass = getStyleAsClassName("array.control.validation")
  	const divClassNames = [validationClass]
    	.concat(
      		isValid ? "" : getStyleAsClassName("array.control.validation.error")
    	)
    	.join(" ")
	const buttonClassAdd = getStyleAsClassName("array.control.add")
	const labelClass = getStyleAsClassName("array.control.label")
	const childControlsClass = getStyleAsClassName("array.child.controls")
	const buttonClassUp = getStyleAsClassName("array.child.controls.up")
	const buttonClassDown = getStyleAsClassName("array.child.controls.down")
	const buttonClassDelete = getStyleAsClassName("array.child.controls.delete")
	const controlClass = [
		getStyleAsClassName("array.control"),
		convertToValidClassName(controlElement.scope)
	].join(" ")

	// Util to convert dot path into slash path: eg: address.country -> /address/country
	const route = '/' + path.split('.').join('/');

  	return (
    	<div className={controlClass}>
      		<div className={divClassNames}>{errors}</div>
			<div className={classNames.children}>
				{data ? (
				range(0, data.length).map(index => {
					const childPath = composePaths(path, `${index}`)
					return (
					<div key={index}>
						<JsonFormsDispatch
						schema={schema}
						uischema={childUiSchema || uischema}
						path={childPath}
						key={childPath}
						renderers={renderers}
						/>
						<div className={childControlsClass}>
						<button
							className={buttonClassUp}
							aria-label={translations.upAriaLabel}
							onClick={() => {
							moveUp(path, index)()
							}}
						>
							{translations.up}
						</button>
						<button
							className={buttonClassDown}
							aria-label={translations.downAriaLabel}
							onClick={() => {
							moveDown(path, index)()
							}}
						>
							{translations.down}
						</button>
						<button
							className={buttonClassDelete}
							aria-label={translations.removeAriaLabel}
							onClick={() => {
							if (
								window.confirm(
								"Are you sure you wish to delete this item?"
								)
							) {
								removeItems(path, [index])()
							}
							}}
						>
							{translations.removeTooltip}
						</button>
						</div>
					</div>
					)
				})
				) : (
				<p>{translations.noDataMessage}</p>
				)}
			</div>
	  		<ItemGroup 
                isBordered={true} 
                isSeparated={true}
                size="small"
            >
                { ( data )? (
                    range( 0, data.length ).map(( index ) => {
                        return (
                            <Item key={ index }>
								<HStack>
									<NavigationButtonAsItem
										path={ `${ route }/${ index }` }
										aria-label={ `Item #${ index }` }
									>
										<HStack justify="space-between">
											<FlexItem>
												item #{ index }
											</FlexItem>
										</HStack>
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
						route={ `${ route }/${ data.length }` } 
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
