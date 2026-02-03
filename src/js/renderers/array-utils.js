import range from "lodash/range";
import React from 'react';
import {
    createDefaultValue,
} from "@jsonforms/core";

import { 
    plus,
    moreVertical,
    edit,
    copy,
    trash,
    chevronUp,
    chevronDown,
    dragHandle,
} from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { IconWithCurrentColor } from './NavigatorLayout/icon-with-current-color';

import {
    __experimentalHStack as HStack,
    __experimentalVStack as VStack,
    DropdownMenu, 
    MenuGroup, 
    MenuItem,
    FlexItem,
    Button
} from '@wordpress/components';

/**
 * Move buttons component for reordering rows
 */
export const ItemMovers = ({ moveUpEnable, onMoveUp, moveDownEnable, onMoveDown }) => {
    return (
        <VStack
            style={{
                gap: 0
            }}
        >
            <Button
                style={{ 
                    height: '12px',
                    boxSizing: 'border-box',
                    padding: '6px 12px'
                }}
                size="small"
                icon={chevronUp}
                aria-label="Move item up"
                onClick={onMoveUp}
                disabled={!moveUpEnable}
            />
            <Button
                style={{ 
                    height: '12px',
                    boxSizing: 'border-box',
                    padding: '6px 12px'
                }}
                size="small"
                icon={chevronDown}
                aria-label="Move item down"
                onClick={onMoveDown}
                disabled={!moveDownEnable}
            />
        </VStack>
    );
};

/**
 * Actions menu for array items
 * @param {boolean} showEdit - Whether to show Edit option
 */
export const ItemActionsMenu = ({ onEdit, onDuplicate, onRemove, showEdit = true }) => (
    <DropdownMenu icon={moreVertical} label="Select an action">
        {() => (
            <>
                <MenuGroup>
                    {showEdit && (
                        <MenuItem icon={edit} onClick={onEdit}>
                            Edit
                        </MenuItem>
                    )}
                    <MenuItem icon={copy} onClick={onDuplicate}>
                        Duplicate
                    </MenuItem>
                </MenuGroup>
                <MenuGroup>
                    <MenuItem icon={trash} onClick={onRemove}>
                        Remove
                    </MenuItem>
                </MenuGroup>
            </>
        )}
    </DropdownMenu>
);

/**
 * Add item button for arrays
 */
export const AddItemButton = ({ path, label, schema, addItem, onClick }) => {
    return (
        <Button
            aria-label={`Add new item`}
            onClick={() => {
                addItem(path, createDefaultValue(schema))();
                if (onClick) onClick();
            }}
        >
            <HStack justify="center">
                <FlexItem>
                    <IconWithCurrentColor
                        icon={plus}
                    />Add {label}
                </FlexItem>
            </HStack>
        </Button>
    );
};

/**
 * Drag handle icon component
 */
export const DragHandleIcon = () => (
    <IconWithCurrentColor icon={dragHandle} />
);

// Re-export icons for convenience
export { dragHandle, plus, moreVertical, edit, copy, trash, chevronUp, chevronDown };
