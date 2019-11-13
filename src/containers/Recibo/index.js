import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "./table";
import BaseSchema from "./schema.json";
import Create from "components/Form/Create";
import Edit from "components/Form/Edit";
import { loadSchema, enrichSections, enrichSection } from "business/schemas";
import PagoLinea from "./components/pagoLinea";

const Schema = loadSchema(BaseSchema);

export default function ReciboApp(props) {
  const classes = useStyles();

  //State

  const [viewCreate, setViewCreate] = React.useState(false);
  const [viewId, setViewId] = React.useState(null);

  const handleClose = () => {
    setViewCreate(false);
  };

  function onCreate() {
    setViewCreate(true);
  }

  function onView(id) {
    setViewId(id);
  }

  //Render

  const sections = enrichSections({ schema: Schema, components: { lineaPagoDocumento: PagoLinea } });

  return (
    <Fragment>
      {viewCreate ? <Create sections={sections} schema={Schema} handleClose={handleClose} /> : null}
      {viewId ? (
        <Edit
          sections={sections}
          schema={Schema}
          id={viewId}
          onView={onView}
          handleClose={() => onView(null)}
        />
      ) : null}
      <Table
        columns={enrichSection({ schema: Schema, table: true })}
        toggleMenu={props.toggleMenu}
        schema={Schema}
        onView={onView}
        onCreate={onCreate}></Table>
      ;
    </Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%"
  },
  relative: {
    position: "relative"
  },
  fab: {
    position: "absolute",
    right: 10,
    top: -4
  }
}));
