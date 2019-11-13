import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import DialogActions from "@material-ui/core/DialogActions";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";
import AddCircle from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";
import FilterLine from "./FilterLine";
import { TextField, Typography } from "@material-ui/core";
import useQuery from "business/hooks/useQuery";
import ColumnSelector from "./ColumnSelector";
import FilterSaveDialog from "./FilterSaveDialog";

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
  const [sortColumns, setSortColumns] = useState([]);

  React.useEffect(() => {
    setColumns(props.columns);
    setSelectedColumns(props.viewColumns);
  }, []);

  React.useEffect(() => {
    setColumns(props.columns);
    setSelectedColumns(props.viewColumns);
  }, [props.columns, props.viewColumns]);

  React.useEffect(() => {
    if (props.filters && props.filters.length > 0) setFilters(props.filters);
  }, [props.filters]);

  function onUpdateColumns(columns) {
    setSelectedColumns(columns);
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
    setShowFilterDialog(true);
  }

  function onFilter(filterName, save) {
    setShowFilterDialog(false);
    var parsedFilters = [];

    filters.forEach(filter => {
      var isOk = false;
      if (filter.key && filter.key.length > 0 && filter.operation && filter.operation.length > 0) isOk = true;

      if (isOk) parsedFilters.push(filter);
    });

    props.updateColumns(selectedColumns);

    setFilters(parsedFilters);
    props.onFilter({
      filters: parsedFilters,
      columns: selectedColumns.map(item => item.key),
      name: filterName,
      saveFilter: save
    });
  }

  return (
    <div>
      {showFilterDialog && <FilterSaveDialog filterName={props.filterName} onClose={onFilter} />}
      <Collapse in={props.open}>
        <div
          style={{
            padding: 10,
            backgroundColor: "#fefefe"
          }}>
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
                <IconButton onClick={addFilter} className={classes.button} aria-label="delete">
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
          </Grid>

          <Grid container>
            <Grid className={classes.grow} item>
              <DialogActions>
                <Button variant="outlined" onClick={props.handleClose} color="primary">
                  Cancelar
                </Button>
                <Button variant="outlined" onClick={onShowFilterDialog} color="primary">
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
