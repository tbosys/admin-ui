import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import StandardListApp from "@tbos/ui/components/StandardListApp";

function StandardContainer(props) {
  //Render
  debugger;
  return (
    <StandardListApp
      enableCreate
      toggleMenu={props.toggleMenu}
      match={props.match}
    />
  );
}

export default function StandardApp(name, columnsArray, createdSchema) {
  return function(props) {
    return <StandardContainer {...props} baseSchema={createdSchema} />;
  };
}
