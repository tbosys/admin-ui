import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import BaseSchema from "./schema.json";
import StandardProcessApp from "components/StandardProcessApp";
import { loadSchema, enrichSections, enrichSection } from "business/schemas";
import OrdenLinea from "./components/ordenLinea";

const Schema = loadSchema(BaseSchema);

export default function StandardApp(props) {
  const statusList = ["por aplicar", "por aprobar", "por imprimir", "por reactivar", "por proformar"];
  const actionsPerState = {
    "por aplicar": [{ title: "Aplicar", value: "aplicar" }],
    "por proformar": [{ title: "Transferir a Aprobar", value: "aplicar" }],
    "por aprobar": [{ title: "Aprobar", value: "aprobar" }],
    "por imprimir": [{ title: "Imprimir", value: "print" }],
    "por reactivar": [{ title: "Reactivar", value: "reactivar" }]
  };

  const sections = enrichSections({ schema: Schema, components: { ordenLinea: OrdenLinea } });

  function onActionClick(action, rows) {
    console.log(action, rows);
  }

  //Render

  return (
    <StandardProcessApp
      enableCreate
      statusFieldName="estado"
      onActionClick={onActionClick}
      statusList={statusList}
      toggleMenu={props.toggleMenu}
      actionsPerState={actionsPerState}
      Schema={Schema}
      sections={sections}
    />
  );
}
