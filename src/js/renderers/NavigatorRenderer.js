import isEmpty from "lodash/isEmpty"
import React from "react"
import { getAjv } from "@jsonforms/core"
import { JsonFormsDispatch, useJsonForms } from "@jsonforms/react"
import { Grid, Hidden } from "@mui/material"

export const renderLayoutElements = (
  elements,
  schema,
  path,
  enabled,
  renderers,
  cells
) => {
  return elements.map((child, index) => (
    <Grid item key={`${path}-${index}`} xs>
      <JsonFormsDispatch
        uischema={child}
        schema={schema}
        path={path}
        enabled={enabled}
        renderers={renderers}
        cells={cells}
      />
    </Grid>
  ))
}

const NavigatorLayoutRendererComponent = ({
  visible,
  elements,
  schema,
  path,
  enabled,
  direction,
  renderers,
  cells
}) => {
  if (isEmpty(elements)) {
    return null
  } else {
    return (
      <Hidden xsUp={!visible}>
        <Grid
          container
          direction={direction}
          spacing={direction === "row" ? 2 : 0}
        >
          {renderLayoutElements(
            elements,
            schema,
            path,
            enabled,
            renderers,
            cells
          )}
        </Grid>
      </Hidden>
    )
  }
}
export const NavigatorLayoutRenderer = React.memo(
  NavigatorLayoutRendererComponent
)

// TODO fix @typescript-eslint/ban-types
// eslint-disable-next-line @typescript-eslint/ban-types
export const withAjvProps = Component =>
  function WithAjvProps(props) {
    const ctx = useJsonForms()
    const ajv = getAjv({ jsonforms: { ...ctx } })

    return <Component {...props} ajv={ajv} />
  }
