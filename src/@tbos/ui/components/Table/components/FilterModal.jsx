import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import DialogActions from "@material-ui/core/DialogActions";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import AddCircle from "@material-ui/icons/AddCircle";
import Blue from "@material-ui/core/colors/blue";

import IconButton from "@material-ui/core/IconButton";
import { TextField, Typography } from "@material-ui/core";
import FilterLine from "./FilterLine";

import ColumnSelector from "./ColumnSelector";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    marginTop: 0,
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
  const [showFilterDialog, setShowFilterDialog] = React.useState(false);

  const [columns, setColumns] = useState([]);

  const [selectedColumns, setSelectedColumns] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedSorts, setSelectedSorts] = useState([]);
  const [selectedSums, setSelectedSums] = useState([]);

  React.useEffect(() => {
    setColumns(props.columns);
    setSelectedColumns(props.viewColumns);
    setSelectedGroups(props.viewGroups);
    setSelectedSorts(props.viewSorts);
    setSelectedSums(props.viewSums);
  }, []);

  React.useEffect(() => {
    setColumns(props.columns);
    setSelectedGroups(props.viewGroups);
    setSelectedSorts(props.viewSorts);
    setSelectedSums(props.viewSums);
    setSelectedColumns(props.viewColumns);
  }, [props.columns, props.viewColumns, props.viewGroups, props.viewSorts]);

  React.useEffect(() => {
    if (props.filters && props.filters.length > 0) setFilters(props.filters);
  }, [props.filters]);

  function onUpdateColumns(columns) {
    setSelectedColumns(columns);
  }

  function onUpdateGroups(groups) {
    setSelectedGroups(groups);
  }

  function onUpdateSums(sums) {
    setSelectedSums(sums);
  }

  function onUpdateSorts(sorts) {
    setSelectedSorts(sorts);
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

  function onShowFilterDialog() {
    setShowFilterDialog(false);
    var parsedFilters = [];

    filters.forEach(filter => {
      var isOk = false;
      if (
        filter.key &&
        filter.key.length > 0 &&
        filter.operation &&
        filter.operation.length > 0
      )
        isOk = true;

      if (isOk) parsedFilters.push(filter);
    });

    props.updateColumns(selectedColumns);

    setFilters(parsedFilters);
    props.onFilter({
      filters: parsedFilters,
      columns: selectedColumns.map(item => item.key),
      name: null,
      saveFilter: false
    });
  }

  return (
    <div>
      <Collapse in={props.open}>
        <div
          style={{
            padding: 10,
            backgroundColor: "#fefefe"
          }}
        >
          <Typography>Filtros</Typography>
          <Grid className={classes.grow} container>
            <Grid className={classes.grow} item xs={12}>
              <ColumnSelector
                updateColumns={onUpdateColumns}
                selectedColumns={selectedColumns}
                columns={columns}
              />
            </Grid>

            <Grid className={classes.grow} item xs={6}>
              <div className={classes.root}>
                Condiciones
                <IconButton
                  onClick={addFilter}
                  className={classes.button}
                  aria-label="delete"
                >
                  <AddCircle />
                </IconButton>
                {filters.map(filter => {
                  return (
                    <FilterLine
                      onDelete={onDeleteFilter}
                      filter={filter}
                      onChangeFilter={onChangeFilter}
                      columns={props.columns}
                    />
                  );
                })}
              </div>
            </Grid>
            <Grid className={classes.grow} item xs={12}>
              <Box
                style={{ backgroundColor: Blue[100] }}
                m={1}
                mt={2}
                border={2}
                p={2}
                borderColor="primary.main"
                pb={4}
              >
                <Grid container spacing={2}>
                  <Grid className={classes.grow} item xs={4}>
                    <ColumnSelector
                      label="Grupos"
                      updateColumns={onUpdateGroups}
                      selectedColumns={selectedGroups}
                      columns={columns}
                    />
                    <Typography variant="caption">
                      En tablas el maximo es 1000
                    </Typography>
                  </Grid>
                  <Grid className={classes.grow} item xs={4}>
                    <ColumnSelector
                      label="Sumar"
                      updateColumns={onUpdateSums}
                      selectedColumns={selectedSums}
                      columns={columns}
                    />
                    <Typography variant="caption">
                      Los grupos solamente se utilizan en reportes y pivotes.
                    </Typography>
                  </Grid>
                  <Grid className={classes.grow} item xs={3}>
                    <ColumnSelector
                      label="Orden"
                      updateColumns={onUpdateSorts}
                      selectedColumns={selectedSorts}
                      columns={columns}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>

          <Grid container>
            <Grid className={classes.grow} item>
              <DialogActions>
                <Button
                  variant="outlined"
                  onClick={props.handleClose}
                  color="primary"
                >
                  Cancelar
                </Button>
                <Button
                  variant="outlined"
                  onClick={onShowFilterDialog}
                  color="primary"
                >
                  Guardar
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </div>
      </Collapse>
    </div>
  );
}
