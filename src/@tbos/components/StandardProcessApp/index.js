import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@tbos/components/Table/ProcessWrapper";
import Create from "@tbos/components/Form/Create";
import Edit from "@tbos/components/Form/Edit";
import { enrichSection } from "@tbos/business/schemas";

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

  return (
    <Fragment>
      {viewCreate ? (
        <Create
          sections={props.sections}
          schema={props.Schema}
          handleClose={handleClose}
        />
      ) : null}
      {viewId ? (
        <Edit
          sections={props.sections}
          schema={props.Schema}
          id={viewId}
          onView={onView}
          handleClose={() => onView(null)}
        />
      ) : null}
      <Table
        statusFieldName={props.statusFieldName}
        onActionClick={props.onActionClick}
        enableTabs={props.statusList}
        statusList={props.statusList}
        actionsPerState={props.actionsPerState}
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
