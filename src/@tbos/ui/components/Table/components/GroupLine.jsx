import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { fade, makeStyles } from "@material-ui/core/styles";
import Collapse from "@material-ui/core/Collapse";

import Input from "@material-ui/core/Input";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FilledInput from "@material-ui/core/FilledInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: 8
  }
}));

export default function FormDialog(props) {
  const classes = useStyles();
  const [columns, setColumns] = React.useState([]);
  const [column, setColumn] = React.useState([]);
  const [operations, setOperations] = React.useState([]);

  React.useEffect(() => {
    setColumns(props.columns);
    if (props.group.key) {
      var column = props.columns.filter(column => column.key == props.group.key)[0];
      setColumn(column);
      setOperations(getOperationsFromColumn(column));
    }
  }, [props.columns]);

  React.useEffect(() => {
    if (props.group.key && operations.length == 0) {
      var column = props.columns.filter(column => column.key == props.group.key)[0];
      setOperations(getOperationsFromColumn(column));
    }
  }, [props.group]);

  function handleChangeColumn(e) {
    if (e.target.value == -1) return props.onDelete(props.group.id);

    var column = props.columns.filter(column => column.key == e.target.value)[0];
    var operations = getOperationsFromColumn(column);
    setOperations(operations);
    props.onChangeFilter({ ...props.group, key: e.target.value, operation: operations[0].key });
    setColumn(column);
  }

  function handleChangeOperation(e) {
    props.onChangeFilter({ ...props.group, operation: e.target.value });
  }

  function handleChangeValue(e) {
    props.onChangeFilter({ ...props.group, value: e.target.value });
  }

  return (
    <Grid item>
      <FormControl className={classes.formControl}>
        <Select value={props.group.key} onChange={handleChangeColumn}>
          {columns.map(column => {
            if (!column.filter) return null;
            return <MenuItem value={column.key}>{column.title}</MenuItem>;
          })}
          <MenuItem value={-1}>Eliminar</MenuItem>
        </Select>
      </FormControl>
    </Grid>
  );
}

function getOperationsFromColumn(column) {
  if (column.type == "string")
    return [
      { title: "contiene", key: "LIKE" },
      { title: "es igual", key: "=" },
      { title: "esta en blanco", key: "IS_NULL" },
      { title: "tiene letras", key: "IS_NOT_NULL" }
    ];
  if (column.type == "number" || column.type == "integer")
    return [
      { title: "es igual", key: "=" },
      { title: "es mayor", key: ">" },
      { title: "es menor", key: ">" },
      { title: "entre", key: "BETWEEN", type: "range" }
    ];
}
