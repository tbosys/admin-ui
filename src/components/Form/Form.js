import React, { useState, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { fade, makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";

import Autocomplete from "components/Autocomplete";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  FormGroup
} from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import NumberFormat from "react-number-format";
import { DatePicker } from "@material-ui/pickers";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import SaveButton from "components/SaveButton";

import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  formControl: { width: "100%" }
}));

export default function Form(props) {
  const classes = useStyles();
  const [sections, setSections] = useState([]);

  React.useEffect(() => {
    const { sections, values } = columnsFromSchema();
    setSections(sections);
    props.setValues({ ...values, ...(props.values || {}) });
  }, []);

  function onChangeCustomField(column, newValue) {
    var newValues = {
      ...props.values,
      [column.key]: {
        value: newValue
      }
    };

    props.setValues(newValues);
  }

  function changeAutocompleteField(column, record) {
    var newValues = {
      ...props.values,
      [column.key]: {
        value: record.id,
        metadata: { id: record.id, name: record[column.nameField] }
      }
    };
    props.setValues(newValues);
  }

  function onChangeTextField(column) {
    return e => {
      var newValues = {
        ...props.values,
        [column.key]: { value: e.currentTarget.value }
      };
      props.setValues(newValues);
    };
  }

  function onChangeNumberField(column) {
    return e => {
      var newValues = {
        ...props.values,
        [column.key]: { value: parseFloat(e.target.value) }
      };
      props.setValues(newValues);
    };
  }

  function onChangeBooleanField(column) {
    return e => {
      var newValues = {
        ...props.values,
        [column.key]: { value: Boolean(e.target.checked) }
      };
      props.setValues(newValues);
    };
  }

  function onChangeIntegerField(column) {
    return e => {
      var newValues = {
        ...props.values,
        [column.key]: { value: parseInt(e.target.value) }
      };
      props.setValues(newValues);
    };
  }

  function onDateFieldChange(column) {
    return newDate => {
      var newValues = {
        ...props.values,
        [column.key]: { value: newDate }
      };
      props.setValues(newValues);
    };
  }

  function onSelectFieldChange(column) {
    return e => {
      var newValues = {
        ...props.values,
        [column.key]: { value: event.target.textContent }
      };

      props.setValues(newValues);
    };
  }

  function columnsFromSchema() {
    var values = {};
    var sections = props.sections.map(section => {
      section.columns = section.columns.map(column => {
        if (column.render == "string")
          values[column.key] = { value: column.default || "" };
        else if (column.render == "date")
          values[column.key] = { value: column.default ? new Date() : null };
        else if (column.render == "boolean")
          values[column.key] = { value: column.default || true };
        else if (column.render == "number")
          values[column.key] = { value: column.default || "" };
        else if (column.render == "integer")
          values[column.key] = { value: column.default || "" };
        else if (column.render == "select")
          values[column.key] = { value: column.default || "" };
        else if (column.render == "component") {
          values[column.key] = { value: column.default || {} };
        } else if (column.default)
          values[column.key] = { value: column.default };
        else return {};

        column.name = column.title;
        return column;
      });

      return section;
    });
    return { sections, values };
  }

  function renderField(column, sectionIndex, index) {
    if (column.render == "autocomplete")
      return (
        <Autocomplete
          isCreate={props.isCreate}
          fieldIndex={index}
          sectionIndex={sectionIndex}
          value={props.values[column.key].value}
          metadata={props.values[column.key]}
          onChange={changeAutocompleteField}
          column={column}
        />
      );
    else if (column.render == "boolean") {
      return (
        <React.Fragment>
          <FormLabel component="legend">{column.title}</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={
                    props.values[column.key] || props.values[column.key] == 1
                  }
                  onChange={onChangeBooleanField(column)}
                  value="gilad"
                />
              }
              label={column.title}
            />
          </FormGroup>
        </React.Fragment>
      );
    } else if (column.render == "number") {
      return (
        <TextField
          InputProps={{
            inputComponent: NumberFormatCustom
          }}
          disabled={column.readOnly}
          InputLabelProps={{ shrink: true }}
          value={props.values[column.key] ? props.values[column.key].value : ""}
          onChange={onChangeNumberField(column)}
          fullWidth
          label={column.title}
        />
      );
    } else if (column.render == "integer") {
      return (
        <TextField
          disabled={column.readOnly}
          InputLabelProps={{ shrink: true }}
          value={props.values[column.key] ? props.values[column.key].value : ""}
          onChange={onChangeIntegerField(column)}
          fullWidth
          type="number"
          label={column.title}
        />
      );
    } else if (column.render == "date") {
      return (
        <DatePicker
          label={column.title}
          value={
            props.values[column.key] ? props.values[column.key].value : null
          }
          onChange={onDateFieldChange(column)}
        />
      );
    } else if (column.render == "select") {
      return (
        <FormControl className={classes.formControl}>
          <InputLabel shrink>{column.title}</InputLabel>
          <Select
            fullWidth
            value={
              props.values[column.key] ? props.values[column.key].value : ""
            }
            onChange={onSelectFieldChange(column)}
            displayEmpty
            className={classes.selectEmpty}
          >
            <MenuItem value="">
              <em>Ninguna</em>
            </MenuItem>
            {column.enum.map(option => {
              return (
                <MenuItem
                  style={{ textTransform: "capitalize" }}
                  value={option}
                >
                  {option}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );
    } else if (column.render == "component") {
      return (
        <column.component
          values={props.values}
          isCreate={props.isCreate}
          fieldIndex={index}
          sectionIndex={sectionIndex}
          value={props.values[column.key].value}
          onChange={onChangeCustomField}
          itemId={props.id}
          column={column}
        />
      );
    } else {
      return (
        <TextField
          disabled={column.readOnly}
          InputLabelProps={{ shrink: true }}
          value={props.values[column.key] ? props.values[column.key].value : ""}
          onChange={onChangeTextField(column)}
          fullWidth
          label={column.title}
        />
      );
    }
  }

  function renderSections() {
    return sections.map((section, sectionIndex) => {
      return (
        <Box key={section.title} m={3} ml={0}>
          <Box mb={1} mt={1}>
            <Typography style={{ fontSize: 15 }} variant="overline">
              {section.title}
            </Typography>
          </Box>
          <Grid spacing={3} container>
            {section.columns.map((column, index) => {
              return (
                <Grid
                  key={column.key}
                  row
                  xs={sections.widths ? section.widths[0] : 12}
                  md={section.widths ? section.widths[1] : 4}
                >
                  <Box m={1}>{renderField(column, sectionIndex, index)}</Box>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      );
    });
  }
  return (
    <Dialog
      scroll={"paper"}
      maxWidth={"lg"}
      fullScreen={props.fullScreen || false}
      fullWidth
      open={true}
      onClose={props.handleClose ? props.handleClose : null}
      aria-labelledby="form-dialog-title"
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={props.handleClose ? props.handleClose : null}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {props.schema.title}
          </Typography>

          <SaveButton
            loading={props.loading}
            success={props.error.success}
            onClick={props.onSave}
          />
        </Toolbar>
      </AppBar>

      <DialogContent>{renderSections()}</DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
}

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator
      prefix="c/"
    />
  );
}
