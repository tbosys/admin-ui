import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import StandardListApp from "@tbos/ui/components/StandardListApp";
import RolesSelector from "./components/RolesSelector";
import { useHistory } from "react-router-dom";

export default function ProfileAdminApp(props) {
  let history = useHistory();

  //Render

  function onAction(action) {}

  return (
    <StandardListApp
      actions={[]}
      components={{ roles: RolesSelector }}
      onActionClick={onAction}
      enableCreate
      toggleMenu={props.toggleMenu}
      match={props.match}
    />
  );
}
