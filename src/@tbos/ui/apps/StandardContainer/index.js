import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  loadSchema,
  enrichSections,
  createSchema
} from "@tbos/ui/business/schemas";

import StandardListApp from "@tbos/ui/components/StandardListApp";

function StandardContainer(props) {
  const Schema = loadSchema(props.baseSchema);

  const sections = enrichSections({
    schema: Schema
  });

  //Render

  return (
    <StandardListApp
      enableCreate
      toggleMenu={props.toggleMenu}
      Schema={Schema}
      sections={sections}
      Schema={Schema}
      match={props.match}
    />
  );
}

export default function StandardApp(name, columnsArray, createdSchema) {
  return function(props) {
    return <StandardContainer {...props} baseSchema={createdSchema} />;
  };
}
