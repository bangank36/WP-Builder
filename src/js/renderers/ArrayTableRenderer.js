import range from "lodash/range";
import React, { useMemo } from 'react';
import {
    composePaths,
} from "@jsonforms/core";
import {
    JsonFormsDispatch
} from "@jsonforms/react";

import { 
    dragHandle,
} from '@wordpress/icons';

import {
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
    DragHandleIcon 
} from './array-utils';

/**
 * ArrayTableControl - Renders an object array with inline controls
 * 
 * Styled to match the inline layout (ItemGroup/Item) but with controls
 * rendered directly instead of navigation buttons.
 * 
 * Each row contains:
 * - Move up/down buttons (or drag handle if draggable)
 * - The control for the item (rendered via JsonFormsDispatch)
 * - Actions menu (Duplicate, Remove)
 */
export const ArrayTableControl = ({
    data,
    label,
    path,
    schema,
    errors,
    addItem,
    removeItems,
    moveUp,
    moveDown,
    renderers,
    cells,
    rootSchema,
    draggable = false,
}) => {
    // Generate a layout UI schema for items based on schema properties
    // For objects with properties, create HorizontalLayout with controls
    // For objects with format (like daterange), use simple Control
    const itemUiSchema = useMemo(() => {
        if (schema.format) {
            // Has a format - use Control which will dispatch to format-specific renderer
            return {
                type: 'Control',
                scope: '#'
            };
        }
        
        if (schema.properties) {
            // Has properties - generate HorizontalLayout with controls for each property
            const elements = Object.keys(schema.properties).map((propKey) => ({
                type: 'Control',
                scope: `#/properties/${propKey}`,
                label: schema.properties[propKey].title || propKey
            }));
            
            return {
                type: 'HorizontalLayout',
                elements
            };
        }
        
        // Fallback to simple control
        return {
            type: 'Control',
            scope: '#'
        };
    }, [schema]);

    return (
        <div>
            <div>{errors}</div>
            <ItemGroup 
                isBordered={false} 
                isSeparated={true}
                size="small"
            >
                {data ? (
                    range(0, data.length).map((index) => {
                        const childPath = composePaths(path, `${index}`);
                        
                        return (
                            <Item key={index}>
                                <HStack justify="space-between">
                                    <FlexItem>
                                        { draggable ? <DragHandleIcon /> : <ItemMovers
                                            moveUpEnable={index > 0}
                                            onMoveUp={() => moveUp(path, index)()}
                                            moveDownEnable={index < data.length - 1}
                                            onMoveDown={() => moveDown(path, index)()}
                                        />}
                                    </FlexItem>
                                    <FlexItem style={{ flex: 1 }}>
                                        <JsonFormsDispatch
                                            schema={schema}
                                            uischema={itemUiSchema}
                                            path={childPath}
                                            renderers={renderers}
                                            cells={cells}
                                        />
                                    </FlexItem>
                                    <ItemActionsMenu 
                                        showEdit={false}
                                        onRemove={() => {
                                            if (
                                                window.confirm(
                                                    "Are you sure you wish to delete this item?"
                                                )
                                            ) {
                                                removeItems(path, [index])();
                                            }
                                        }}
                                        onDuplicate={() => {
                                            addItem(path, data[index])();
                                        }}
                                    />
                                </HStack>
                            </Item>
                        );
                    })
                ) : null}
                <Item>
                    <AddItemButton 
                        schema={schema}
                        label={label} 
                        path={path}
                        addItem={addItem}
                    />
                </Item>
            </ItemGroup>
        </div>
    );
};

export default ArrayTableControl;
