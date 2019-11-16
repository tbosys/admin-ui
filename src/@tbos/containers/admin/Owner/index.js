import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import BaseSchema from "./schema.json";
import { loadSchema, enrichSections } from "@tbos/business/schemas";
import StandardListApp from "@tbos/components/StandardListApp";
import ProfileSelector from "./components/ProfileSelector";
import { useHistory } from "react-router-dom";
const Schema = loadSchema(BaseSchema);

export default function ReciboApp(props) {
  let history = useHistory();

  const sections = enrichSections({
    schema: Schema,
    components: { profileSelector: ProfileSelector }
  });

  //Render

  function onAction(action) {
    if (action.title == "Administrar Roles") {
      history.push("rol");
    } else if (action.title == "Administrar Perfiles") {
      history.push("profile");
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
