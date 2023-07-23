import isEmpty from "lodash/isEmpty"
import {
  findUISchema,
  Generate,
  isObjectControl,
  rankWith
} from "@jsonforms/core"
import { JsonFormsDispatch, withJsonFormsDetailProps } from "@jsonforms/react"
import { Hidden } from "@mui/material"
import React, { useMemo } from "react"

export const MaterialObjectRenderer = ({
  renderers,
  cells,
  uischemas,
  schema,
  label,
  path,
  visible,
  enabled,
  uischema,
  rootSchema
}) => {
  const detailUiSchema = useMemo(
    () =>
      findUISchema(
        uischemas,
        schema,
        uischema.scope,
        path,
        () =>
          isEmpty(path)
            ? Generate.uiSchema(schema, "VerticalLayout")
            : { ...Generate.uiSchema(schema, "Group"), label },
        uischema,
        rootSchema
      ),
    [uischemas, schema, uischema.scope, path, label, uischema, rootSchema]
  )
  return (
    <Hidden xsUp={!visible}>
      <JsonFormsDispatch
        visible={visible}
        enabled={enabled}
        schema={schema}
        uischema={detailUiSchema}
        path={path}
        renderers={renderers}
        cells={cells}
      />
    </Hidden>
  )
}

export const modifiedMaterialObjectControlTester = rankWith(3, isObjectControl)

export default withJsonFormsDetailProps(MaterialObjectRenderer)
