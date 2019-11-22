import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import BaseSchema from "./schema.json";
import { loadSchema, enrichSections } from "@tbos/ui/business/schemas";
import StandardListApp from "@tbos/ui/components/StandardListApp";
import Properties from "./components/Properties";
import { useHistory } from "react-router-dom";
import useMetadata from "@tbos/ui/business/hooks/useMetadata";

export default function ReciboApp(props) {
  let history = useHistory();

  const { fetch, data, loading: loading, error: error } = useMetadata({
    path: `crm/metadata/get`
  });

  if (error) return "error";

  if (loading) {
    return "loading";
  }

  if (!data) {
    fetch({ name: props.match.params.name });
    return "loading";
  }

  const Schema = loadSchema(data);
  const sections = enrichSections({
    schema: Schema,
    components: { properties: Properties }
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
