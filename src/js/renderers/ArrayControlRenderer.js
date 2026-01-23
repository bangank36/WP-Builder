import isEmpty from 'lodash/isEmpty';
import {
    composePaths,
    findUISchema,
    Generate,
    isPrimitiveArrayControl,
    isObjectArrayControl,
    rankWith,
    or
} from '@jsonforms/core';
import { 
    useJsonForms,
    ctxToArrayControlProps,
    ctxDispatchToArrayControlProps
 } from '@jsonforms/react';
import React, { useMemo, useContext, useEffect } from 'react';
import { Context as NavigatorContext } from './NavigatorContext';
import { resolvePathToRoute } from './util';
import { ArrayControl } from './ArrayLayoutRenderer';

import { chevronLeft, chevronRight } from '@wordpress/icons';
import { isRTL, __ } from '@wordpress/i18n';
import { IconWithCurrentColor } from './NavigatorLayout/icon-with-current-color';
import { NavigationButtonAsItem } from './NavigatorLayout/navigation-button';
import {
    __experimentalUseNavigator as useNavigator,
	__experimentalHStack as HStack,
	FlexItem,
} from '@wordpress/components';

export const GutenbergArrayRenderer = (ownControlProps) => {
    const ctx = useJsonForms();
    const stateProps = ctxToArrayControlProps(ctx, ownControlProps);
    const dispatchProps = ctxDispatchToArrayControlProps(ctx.dispatch);

    const props = {
        ...ownControlProps,
        ...stateProps,
        ...dispatchProps
    }

    const {
        renderers,
        cells,
        uischemas,
        schema,
        label,
        path,
        visible,
        enabled,
        uischema,
        rootSchema,
    } = props;

    // Check if inline layout mode is enabled
    // See: https://jsonforms.io/examples/list-with-detail
    const isInlineLayout = uischema.options?.detail?.type === 'VerticalLayout';

    const detailUiSchema = useMemo(
        () =>
        findUISchema(
            uischemas,
            schema,
            uischema.scope,
            path,
            () =>
            isEmpty(path)
                ? Generate.uiSchema(schema, 'VerticalLayout')
                : { ...Generate.uiSchema(schema, 'Group'), label },
            uischema,
            rootSchema
        ),
        [uischemas, schema, uischema.scope, path, label, uischema, rootSchema]
    );

    const childUiSchema = useMemo(
        () =>
        findUISchema(
            uischemas,
            schema,
            uischema.scope,
            path,
            () =>
            isEmpty(path)
                ? Generate.uiSchema(schema, 'VerticalLayout')
                : { ...Generate.uiSchema(schema, 'Group'), label },
            uischema,
            rootSchema
        ),
        [uischemas, schema, uischema.scope, path, label, uischema, rootSchema]
    );

    detailUiSchema.label = detailUiSchema.label || label;

    const route = resolvePathToRoute(path);

    const [screenContent, setScreenContent] = useContext(NavigatorContext);

    const navigator = useNavigator();

    //UseEffect to fix the issue Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate.
    useEffect(() => {
        // Use the callback since the new state is based on the previous state
        setScreenContent(prevScreenContent => ({
            ...prevScreenContent,
            // If inline layout detected, do not render main array into own screen
            ...( !isInlineLayout ? {
                [ `${route}` ]: {
                    rendererProps: ( {
                        ...ownControlProps
                    } ),
                    label: detailUiSchema.label,
                    path: path,
                    contentType: 'array'
                },
            } : {}),
            [ `${route}/:index` ]: {
                rendererProps: (
                {    
                    renderers,
                    cells,
                    uischemas,
                    schema,
                    label,
                    path: composePaths(path, `${0}`),
                    visible,
                    enabled,
                    uischema: childUiSchema,
                    rootSchema,
                }),
                label: detailUiSchema.label,
                path: path
            }
        }))
    }, [ route ] )

    if (!visible) {
        return null;
    }

    // Inline layout: render array list directly on current screen
    if (isInlineLayout) {
        return (
            <>
                <FlexItem>
                    { detailUiSchema.label }
                </FlexItem>
                <ArrayControl
                    data={stateProps.data}
                    label={detailUiSchema.label || label}
                    path={path}
                    schema={schema}
                    errors={stateProps.errors}
                    addItem={dispatchProps.addItem}
                    removeItems={dispatchProps.removeItems}
                    moveUp={dispatchProps.moveUp}
                    moveDown={dispatchProps.moveDown}
                />
            </>
        );
    }

    // Default: render navigation button
    return (
        <>
            <NavigationButtonAsItem
                path={`${route}`}
                aria-label={detailUiSchema.label}
            >
                <HStack justify="space-between">
                <FlexItem>
                    Edit {detailUiSchema.label}
                </FlexItem>
                <IconWithCurrentColor
                    icon={isRTL() ? chevronLeft : chevronRight}
                />
                </HStack>
            </NavigationButtonAsItem>
        </>
    )
};

export const gutenbergArrayControlTester = rankWith(
    9,
    or(isObjectArrayControl, isPrimitiveArrayControl)
);

export default GutenbergArrayRenderer;
