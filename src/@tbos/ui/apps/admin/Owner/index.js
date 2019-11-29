import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import StandardListApp from "@tbos/ui/components/StandardListApp";
import ProfileSelector from "./components/ProfileSelector";
import { useHistory } from "react-router-dom";

export default function OwnerAdminApp(props) {
  let history = useHistory();

  //Render

  function onAction(action) {
    if (action.title == "Administrar Roles") {
      history.push("/rol");
    } else if (action.title == "Administrar Perfiles") {
      history.push("/profile");
    } else if (action.title == "Login") {
      console.log("ok");
    }
  }

  return (
    <StandardListApp
      actions={[
        { title: "Administrar Perfiles", standalone: true },
        { title: "Administrar Roles", standalone: true },
        { title: "Login" }
      ]}
      components={{ profileSelector: ProfileSelector }}
      onActionClick={onAction}
      enableCreate
      toggleMenu={props.toggleMenu}
      match={props.match}
    />
  );
}
