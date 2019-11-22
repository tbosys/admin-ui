import React, { useState, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { fade, makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import TableList from "./components/TableList";
import FieldList from "./components/FieldList";

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
import SaveButton from "@tbos/ui/components/SaveButton";
import Autocomplete from "@tbos/ui/components/Autocomplete";

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

  function onChangeSelectedTable(tableName) {
    var newValues = {
      ...props.values,
      ["table"]: {
        value: tableName
      }
    };
    props.setValues(newValues);
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

      <DialogContent>
        <TableList
          onChange={onChangeSelectedTable}
          open={!props.values.table.value}
        />
        <Grid container>
          <Grid item xs={3}>
            <FieldList values={props.values} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
