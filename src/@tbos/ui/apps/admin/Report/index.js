import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import BaseSchema from "./schema.json";
import { loadSchema, enrichSections } from "@tbos/ui/business/schemas";
import StandardListApp from "./Report";
import { useHistory } from "react-router-dom";
const Schema = loadSchema(BaseSchema);

export default function ReciboApp(props) {
  const sections = enrichSections({
    schema: Schema
  });

  //Render

  function onAction(action) {}

  return (
    <StandardListApp
      actions={[]}
      onActionClick={onAction}
      enableCreate
      toggleMenu={props.toggleMenu}
      Schema={Schema}
      sections={sections}
      Schema={Schema}
      match={props.match}
    />
  );
}
