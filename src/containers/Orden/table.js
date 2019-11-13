import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Table from "components/Table/ProcessWrapper";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

export default function OrdenTable(props) {
  const classes = useStyles();
  const statusList = ["por aplicar", "por aprobar", "por imprimir", "por reactivar", "por proformar"];
  const actionsPerState = {
    "por aplicar": [{ title: "Aplicar", value: "aplicar" }],
    "por proformar": [{ title: "Transferir a Aprobar", value: "aplicar" }],
    "por aprobar": [{ title: "Aprobar", value: "aprobar" }],
    "por imprimir": [{ title: "Imprimir", value: "print" }],
    "por reactivar": [{ title: "Reactivar", value: "reactivar" }]
  };

  function onActionClick(action) {
    return () => {
      return true;
    };
  }

  //Render

  function renderContext({ selectedRows, countPerState, status, filter }) {
    return (
      <Fragment>
        <Paper className={classes.ert}>
          <Tabs
            onChange={(e, status) => {
              filter({ status });
            }}
            value={status}
            indicatorColor="primary"
            textColor="primary"
            centered>
            {statusList.map(status => (
              <Tab value={status} label={`${status} (${countPerState[status] || 0})`} />
            ))}
          </Tabs>
        </Paper>
        <Box className={classes.relative} m={1} mt={2} mb={2}>
          <Fab
            onClick={props.onCreate}
            size="medium"
            color="primary"
            aria-label="add"
            className={classes.fab}>
            <AddIcon />
          </Fab>
          <Grid container spacing={1} direction="row" alignItems="center">
            {(actionsPerState[status] || []).map(action => (
              <Grid item>
                <Button
                  disabled={selectedRows.length == 0}
                  onClick={onActionClick(action)}
                  size="small"
                  variant="outlined"
                  color="primary">
                  {action.title}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Table
        statusFieldName="estado"
        statusList={statusList}
        schema={props.schema}
        onView={props.onView}
        columns={props.columns}
        toggleMenu={props.toggleMenu}
        renderContext={renderContext}
      />
    </Fragment>
  );
}
//

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
