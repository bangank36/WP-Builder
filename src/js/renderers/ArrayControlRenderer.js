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
import { Context as NavigatorContext } from '../component/context'

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

    // Util to convert dot path into slash path: eg: address.country -> /address/country
    const route = '/' + path.split('.').join('/');

    const [screenContent, setScreenContent] = useContext(NavigatorContext);

    const navigator = useNavigator();
    console.log(navigator);

    //UseEffect to fix the issue Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate.
    useEffect(() => {
        // Use the callback since the new state is based on the previous state
        setScreenContent(prevScreenContent => ({
            ...prevScreenContent,
            [`${route}`]: {
                component: ( {
                    ...ownControlProps
                } ),
                label: detailUiSchema.label,
                path: path,
                contentType: 'array'
            },
            [`${route}/:index`]: {
                component: (
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
            },
			[`${route}/new`]: {
                component: (
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
            },
        }))
    }, [route])

    return !visible ? null : (
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
