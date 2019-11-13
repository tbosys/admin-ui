import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import BaseSchema from "./schema.json";

import { loadSchema, enrichSections } from "business/schemas";

import StandardListApp from "components/StandardListApp";

const Schema = loadSchema(BaseSchema);

export default function ReciboApp(props) {
  const sections = enrichSections({ schema: Schema });

  //Render

  return (
    <StandardListApp
      enableCreate
      toggleMenu={props.toggleMenu}
      Schema={Schema}
      sections={sections}
      Schema={Schema}
    />
  );
}
