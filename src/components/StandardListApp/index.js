import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "components/Table/ListWrapper";

import Create from "components/Form/Create";
import Edit from "components/Form/Edit";
import { enrichSection } from "business/schemas";

export default function ReciboApp(props) {
  const classes = useStyles();

  //State

  const [viewId, setViewId] = React.useState(null);
  const [formResponseHistory, setFormResponseHistory] = React.useState([]);

  const handleFormClose = response => {
    setViewId(null);
    if (response) setFormResponseHistory([...formResponseHistory, response]);
  };

  function onCreate() {
    setViewId(-1);
  }

  function onView(id) {
    setViewId(id);
  }

  //Render

  return (
    <Fragment>
      {viewId == -1 ? (
        <Create
          sections={props.sections}
          schema={props.Schema}
          handleClose={handleFormClose}
        />
      ) : null}
      {viewId > 0 ? (
        <Edit
          sections={props.sections}
          schema={props.Schema}
          id={viewId}
          onView={onView}
          handleClose={handleFormClose}
        />
      ) : null}

      <Table
        updateHistory={formResponseHistory}
        enableCreate={props.enableCreate == false ? false : true}
        columns={enrichSection({ schema: props.Schema, table: true })}
        toggleMenu={props.toggleMenu}
        schema={props.Schema}
        onView={onView}
        onCreate={onCreate}
      ></Table>
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
