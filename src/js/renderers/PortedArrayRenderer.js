/*
  The MIT License

  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import range from "lodash/range"
import React, { useMemo, useContext, useEffect } from 'react';
import {
  composePaths,
  createDefaultValue,
  findUISchema,
  Helpers,
  rankWith,
  or,
  isPrimitiveArrayControl,
  isObjectArrayControl,
  isObjectArrayWithNesting
} from "@jsonforms/core"
import {
  JsonFormsDispatch,
  withJsonFormsArrayControlProps
} from "@jsonforms/react"

import { Context as NavigatorContext } from '../component/context';

import { chevronLeft, chevronRight } from '@wordpress/icons';
import { isRTL, __ } from '@wordpress/i18n';
import { IconWithCurrentColor } from './NavigatorLayout/icon-with-current-color';
import { NavigationButtonAsItem } from './NavigatorLayout/navigation-button';

import {
    __experimentalUseNavigator as useNavigator,
	__experimentalHStack as HStack,
	FlexItem,
} from '@wordpress/components';

const { convertToValidClassName } = Helpers

export const ArrayControl = ({
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
}) => {
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
    [uischemas, schema, uischema.scope, path, uischema, rootSchema]
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

  return (
    <div className={controlClass}>
      <header>
        <label className={labelClass}>{label}</label>
        <button
          className={buttonClassAdd}
          onClick={addItem(path, createDefaultValue(schema))}
        >
          Add to {label}
        </button>
      </header>
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
    </div>
  )
}

export const ArrayControlRenderer = ({
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
}) => {
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

  // Util to convert dot path into slash path: eg: address.country -> /address/country
  const route = '/' + path.split('.').join('/');

  const [screenContent, setScreenContent] = useContext(NavigatorContext);

    useEffect(() => {
        // Use the callback since the new state is based on the previous state
        setScreenContent(prevScreenContent => ({
            ...prevScreenContent,
            [`${route}`]: {
                component: (<ArrayControl
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
                  />),
                label: uischema.label,
                path: path
            },
        }))
    });

  return (
    <NavigationButtonAsItem
        path={`${route}`}
        aria-label={uischema.label}
    >
        <HStack justify="space-between">
        <FlexItem>
            Edit {uischema.label}
        </FlexItem>
        <IconWithCurrentColor
            icon={isRTL() ? chevronLeft : chevronRight}
        />
        </HStack>
    </NavigationButtonAsItem>
  )
}

export default withJsonFormsArrayControlProps(ArrayControlRenderer)

export const portedArrayControlTester = rankWith(
    12,
    or(isObjectArrayControl, isPrimitiveArrayControl)
);
