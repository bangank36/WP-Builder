import isEmpty from "lodash/isEmpty";
import React from "react";
import { getAjv } from "@jsonforms/core";
import { JsonFormsDispatch, useJsonForms } from "@jsonforms/react";
import {
    __experimentalGrid as Grid,
} from '@wordpress/components';

export const renderLayoutElements = (
    elements,
    schema,
    path,
    enabled,
    renderers,
    cells
) => {
    return elements.map( (child, index) => (
        <Grid key={ `${ path }-${ index }` }>
            <JsonFormsDispatch
                uischema={ child }
                schema={ schema }
                path={ path }
                enabled={ enabled } 
                renderers={ renderers }
                cells={ cells }
            />
        </Grid>
    ) )
}

const LayoutRendererComponent = ( {
    visible,
    elements,
    schema,
    path,
    enabled,
    direction,
    renderers,
    cells
} ) => {
    if ( isEmpty( elements ) ) {
        return null
    } else {
        return (
            !visible ? null : (
                <Grid
                    gap={ direction === "row" ? 2 : 0 }
                >
                { renderLayoutElements(
                    elements,
                    schema,
                    path,
                    enabled,
                    renderers,
                    cells
                ) }
                </Grid>
            )
        )
    }
}
export const GutenbergLayoutRenderer = React.memo(
  LayoutRendererComponent
)

// TODO fix @typescript-eslint/ban-types
// eslint-disable-next-line @typescript-eslint/ban-types
export const withAjvProps = Component =>
    function WithAjvProps( props ) {
        const ctx = useJsonForms()
        const ajv = getAjv( { jsonforms: { ...ctx } } )

        return <Component { ...props } ajv={ ajv } />
    }
