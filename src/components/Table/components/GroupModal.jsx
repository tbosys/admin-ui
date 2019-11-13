import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import DialogActions from "@material-ui/core/DialogActions";
import ColumnSelector from "./ColumnSelector";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  grow: {
    flexGrow: 1
  }
}));

export default function FilterModal(props) {
  const classes = useStyles();

  //Filters are centralized at this level, but they also are shared with the parent
  const [filters, setFilters] = React.useState([{ id: 1, key: "" }]);
  const [selectedColumns, setSelectedColumns] = useState([]);

  function onFilter() {
    var correctFilters = filters.filter(filter => {
      var isOk = false;
      if (filter.key && filter.key.length > 0 && filter.operation && filter.operation.length > 0) isOk = true;
      if (isOk && filter.operation != "IS_NULL" && filter.value == null) isOk = false;
      return isOk;
    });

    props.onFilter(correctFilters);
    setFilters(correctFilters);
  }

  function onChangeFilter(filter) {
    setFilters(
      filters.map(item => {
        if (item.id !== filter.id) return item;

        return {
          ...filter
        };
      })
    );
  }

  function addFilter() {
    setFilters(filters.concat([{ id: parseInt(Math.random() * 100000) }]));
  }

  function onDeleteFilter(filterId) {
    return () => {
      setFilters(
        filters
          .filter(item => {
            if (item.id !== filterId) return true;
            return false;
          })
          .map(item => item)
      );
    };
  }

  function onUpdateColumns(columns) {
    setSelectedColumns(columns);
  }

  return (
    <div>
      <Collapse in={props.open}>
        <div className={classes.root}>
          <Typography>Para agrupar se deben descargar todos los datos, revise los filtros primero</Typography>

          <ColumnSelector
            updateColumns={onUpdateColumns}
            selectedColumns={selectedColumns}
            columns={props.columns}
          />
        </div>
        <Grid container>
          <Grid className={classes.grow} item>
            <DialogActions>
              <Button onClick={props.handleClose} color="primary">
                Cancelar
              </Button>
              <Button onClick={onFilter} color="primary">
                Agrupar
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
      </Collapse>
    </div>
  );
}
