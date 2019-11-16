import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { loadSchema, enrichSections, createSchema } from "@tbos/schemas";

import StandardListApp from "@tbos/components/StandardListApp";

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
    />
  );
}

export default function StandardApp(name, columnsArray) {
  const createdSchema = createSchema(name, columnsArray);
  return function(props) {
    return <StandardContainer {...props} baseSchema={createdSchema} />;
  };
}
