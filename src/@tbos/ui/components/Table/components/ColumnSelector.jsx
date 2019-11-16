import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: 0,
    minWidth: "100%"
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: 2
  }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

export default function MultipleSelect(props) {
  const classes = useStyles();
  const theme = useTheme();

  function handleChange(event) {
    if (props.toggleId && event.target.value.indexOf("id") == -1) return null;

    if (props.updateColumns) {
      props.updateColumns(
        event.target.value.map(
          columnKey => props.columns.filter(loopColumn => loopColumn.key == columnKey)[0]
        )
      );
    }
  }

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-checkbox">{props.label || "Columnas"}</InputLabel>
        <Select
          multiple
          value={props.selectedColumns.map(column => column.key)}
          onChange={handleChange}
          input={<Input id="select-multiple-checkbox" />}
          renderValue={selected => {
            return (
              <div className={classes.chips}>
                {selected.map(columnKey => {
                  const column = props.selectedColumns.filter(loopColumn => loopColumn.key == columnKey)[0];
                  return (
                    <Chip
                      size="small"
                      variant="outlined"
                      key={column.key}
                      label={column.title}
                      className={classes.chip}
                    />
                  );
                })}
              </div>
            );
          }}
          MenuProps={MenuProps}>
          {props.columns.map(column => {
            if (!props.selectedColumns) return;
            return (
              <MenuItem key={column.key} value={column.key}>
                <Checkbox
                  checked={props.selectedColumns.filter(loopColumn => column.key == loopColumn.key)[0]}
                />
                <ListItemText primary={column.title} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
