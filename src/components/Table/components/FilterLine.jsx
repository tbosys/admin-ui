import React, { useState } from "react";
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
import moment from "moment";
import { DatePicker } from "@material-ui/pickers";

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
    marginTop: 0,
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: 0
  }
}));

export default function FormDialog(props) {
  const classes = useStyles();
  const [columns, setColumns] = React.useState([]);
  const [column, setColumn] = React.useState([]);
  const [operations, setOperations] = React.useState([]);
  const [selectedDateStart, setSelectedDateStart] = useState(new Date());
  const [selectedDateEnd, setSelectedDateEnd] = useState(new Date());

  React.useEffect(() => {
    setColumns(props.columns);
    if (props.filter.key) {
      var column = props.columns.filter(column => column.key == props.filter.key)[0];
      setColumn(column);
      setOperations(getOperationsFromColumn(column));
    }
  }, [props.columns]);

  React.useEffect(() => {
    if (props.filter.key && operations.length == 0) {
      var column = props.columns.filter(column => column.key == props.filter.key)[0];
      setOperations(getOperationsFromColumn(column));
    }
  }, [props.filter]);

  function handleChangeColumn(e) {
    var column = props.columns.filter(column => column.key == e.target.value)[0];
    var path = column.key;

    if (column.render == "autocomplete") path = column.key;
    var operations = getOperationsFromColumn(column);
    if (!operations) throw new Error(`No se encuentran operaciones para ${column.title}`);
    setOperations(operations);

    props.onChangeFilter({
      ...props.filter,
      path: path,
      key: e.target.value,
      operation: operations[0].key,
      value: ""
    });
    setColumn(column);
  }

  function handleDateRangeChange(type) {
    return newDate => {
      if (type == "start") {
        setSelectedDateStart(newDate);
        props.onChangeFilter({
          ...props.filter,
          value: [(newDate = moment(newDate).format("YYYY-MM-DD 00:00:01")), selectedDateEnd]
        });
      } else {
        setSelectedDateEnd(newDate);
        props.onChangeFilter({
          ...props.filter,
          value: [selectedDateStart, (newDate = moment(newDate).format("YYYY-MM-DD 11:59:59"))]
        });
      }
    };
  }

  function handleChangeOperation(e) {
    var operation = JSON.parse(e.currentTarget.dataset.operation);
    if (operation.key == "BETWEEN_DATE") {
      setSelectedDateStart(new Date());
      setSelectedDateEnd(new Date());
      props.onChangeFilter({
        ...props.filter,
        metadata: operation,
        operation: operation.key,
        value: [new Date(), new Date()]
      });
    } else
      props.onChangeFilter({ ...props.filter, metadata: operation, operation: operation.key, value: "" });
  }

  function handleChangeValue(e) {
    props.onChangeFilter({ ...props.filter, value: e.target.value });
  }

  function renderStaticDates() {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel shrink={true} htmlFor="select-multiple-checkbox">
          Campo
        </InputLabel>

        <Select value={props.filter.key} onChange={handleChangeValue}>
          <MenuItem value={"HOY"}>HOY</MenuItem>
          <MenuItem value={"AYER"}>AYER</MenuItem>
        </Select>
      </FormControl>
    );
  }
  function renderBetweenDate() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <DatePicker label="Desde" value={selectedDateStart} onChange={handleDateRangeChange("start")} />
        </Grid>
        <Grid item xs={6}>
          <DatePicker label="Hasta" value={selectedDateEnd} onChange={handleDateRangeChange("end")} />
        </Grid>
      </Grid>
    );
  }

  function renderTextValue() {
    if (props.filter.operation == "STATIC_DATE") return renderStaticDates();
    if (props.filter.operation == "BETWEEN_DATE") return renderBetweenDate();
    if (props.filter.operation == "IN_PROGRESS") return null;

    return (
      <FormControl className={classes.formControl}>
        <InputLabel shrink={true} htmlFor="select-multiple-checkbox">
          Filtro
        </InputLabel>

        <Input
          label="Filtro"
          className={classes.textField}
          value={props.filter.value}
          onChange={handleChangeValue}
          inputProps={{
            "aria-label": "description"
          }}
        />
      </FormControl>
    );
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel shrink={true} htmlFor="select-multiple-checkbox">
              Campo
            </InputLabel>

            <Select value={props.filter.key} onChange={handleChangeColumn}>
              {columns.map(column => {
                if (!column.filter) return null;
                return <MenuItem value={column.key}>{column.title}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>

        <Grid item>
          <FormControl className={classes.formControl}>
            <InputLabel shrink={true} htmlFor="select-multiple-checkbox">
              Operacion
            </InputLabel>

            <Select value={props.filter.operation} onChange={handleChangeOperation}>
              {operations.map(operation => {
                return (
                  <MenuItem data-operation={JSON.stringify(operation)} value={operation.key}>
                    {operation.title}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>{renderTextValue()}</Grid>

        <Grid item>
          <IconButton
            onClick={props.onDelete(props.filter.id)}
            className={classes.button}
            aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}
/*
{ title: "Hoy", key: "HOY" },
{ title: "Ayer", key: "AYER" },
{ title: "Este Ciclo", key: "CICLO" },
{ title: "Esta Semana", key: "ESTA SEMANA" },
{ title: "Este mes", key: "ESTE MES" },
{ title: "Este Año Fiscal", key: "ESTE AÑOF" },
{ title: "Ultimo Mes", key: "ULTIMO MES" },
{ title: "Ultimo Año Fiscal", key: "ULTIMO AÑOF" },
{ title: "12 Semanas", key: "12 SEMANAS" },
{ title: "16 Semanas", key: "16 SEMANAS" },
{ title: "6 Meses", key: "6 MESES" },
{ title: "12 Meses", key: "12 MESES" }
*/

function getValuesForOperation() {}

function getOperationsFromColumn(column) {
  if (column.filter == "autoComplete") return [{ title: "contiene", key: "LIKE" }];
  if (column.filter == "date")
    return [
      { title: "LITERAL", key: "STATIC_DATE" },
      { title: "Exacta", key: "=" },
      { title: "Rango", key: "BETWEEN_DATE" }
    ];

  if (column.key == "estado")
    return [{ title: "activo", key: "IN_PROGRESS" }, { title: "contiene", key: "LIKE" }];
  else if (column.filter == "number" || column.filter == "integer")
    return [
      { title: "es igual", key: "=" },
      { title: "es mayor", key: ">" },
      { title: "es menor", key: ">" },
      { title: "entre", key: "BETWEEN", type: "range" }
    ];
  else
    return [
      { title: "contiene", key: "LIKE" },
      { title: "es igual", key: "=" },
      { title: "esta en blanco", key: "IS_NULL" },
      { title: "tiene letras", key: "IS_NOT_NULL" }
    ];
}
