import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import StandardListApp from "@tbos/ui/components/StandardListApp";

import { useHistory } from "react-router-dom";

import Properties from "./components/Properties";
import Form from "./components/Form";

export default function AdminTableApp(props) {
  let history = useHistory();

  function onAction(action) {}

  return (
    <StandardListApp
      metadata={props.metadata}
      components={{ properties: Properties, form: Form }}
      actions={[]}
      onActionClick={onAction}
      enableCreate
      toggleMenu={props.toggleMenu}
      match={props.match}
    />
  );
}
