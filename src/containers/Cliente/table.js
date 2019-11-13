import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Table from "components/Table/ListWrapper";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

export default function StandardApp(props) {
  const classes = useStyles();

  function onActionClick(action) {
    return () => {
      return true;
    };
  }

  //Render

  function renderContextBars([selectedRows]) {
    return (
      <Fragment>
        <Box className={[classes.relative, classes.contextBox].join(" ")} m={1} mt={2} mb={2}>
          <Fab
            onClick={props.onCreate}
            size="medium"
            color="primary"
            aria-label="add"
            className={classes.fab}>
            <AddIcon />
          </Fab>
        </Box>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Table
        onView={props.onView}
        schema={props.schema}
        toggleMenu={props.toggleMenu}
        columns={props.columns}
        renderContextBars={renderContextBars}
        schema={props.schema}
      />
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
  },
  contextBox: {
    minHeight: 40
  }
}));
