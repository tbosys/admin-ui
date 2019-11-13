import React from "react";
import BaseElement from "./base";
import SmartForm from "components/SmartForm/Form.jsx";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAction from "components/Card/CardAction.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import AppBar from "@material-ui/core/AppBar";

import Add from "@material-ui/icons/Add";

import CustomInput from "components/CustomInput/CustomInput";

import withStyles from "@material-ui/core/styles/withStyles";

// material-ui components
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Divider from "@material-ui/core/Divider";
import { Grid } from "@material-ui/core";

import {
  onCreateForm,
  onFieldChange,
  onUpdateField,
  onUpdateItem,
  selectFormById
} from "redux/reducers/form";

import { onSave } from "redux/reducers/data";
import modalStyle from "assets/jss/material-dashboard-pro-react/modalStyle.jsx";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

const styles = theme => ({
  ...modalStyle,
  modal: {
    backgroundColor: "#EEEEEE"
  },
  appBar: {
    position: "relative"
  },
  ...customSelectStyle,
  menuItem: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  icon: {}
});

class LookUpElement extends BaseElement {
  constructor() {
    super();
    this.state = {
      options: [],
      loading: false
    };
  }

  transformValue(item) {
    return item.id;
  }

  getValue() {
    let column = this.props.column;
    return { name: this.props.item[`__${column.key}`], id: this.props.item[column.key] };
  }

  onOpen = e => {
    this.setState({ loading: true });
    this.props.dispatchSimpleApi(this.props.column, `${this.props.column.route}/allWithName`).then(res => {
      if (!res) this.setState({ loading: false }); //handle load error.
      this.setState({ options: res, loading: false });
    });

    //this.props.dispatch( apiCall({},action) )
  };

  onFieldChange = e => {
    var value = e.value || e.target.value;
    var name = this.props.column.key;

    if (value == "+") return this.onCreateItem();

    if (value == "") value = {};
    this.props.onChange(name, value);
  };

  onCreateItem() {
    var column = this.props.column;
    var formPromise = this.props.showCreateModal(column.route);
    formPromise
      .then(result => {
        this.setState({ options: [...this.state.options, result] });
        var name = this.props.column.key;
        this.props.onChange(name, result.id);
      })
      .catch(function(e) {
        console.log(e);
      });
  }

  onSaveForm() {}

  render() {
    const { classes } = this.props;

    let column = this.props.column;
    let value = this.getValue();
    if (typeof value == "undefined") value = "";
    var size = this.props.size;
    if (column.ui && column.ui.fullWidth) size = 12;

    if (this.state.options.length == 0 && value.id) this.state.options = this.state.options.concat([value]);

    return (
      <FormControl fullWidth className={classes.selectFormControl}>
        <InputLabel htmlFor={`form_select_${column.key}`} className={classes.selectLabel}>
          {column.title}
        </InputLabel>
        <Select
          onOpen={this.onOpen}
          MenuProps={{
            className: classes.selectMenu,
            onEnter: this.onOpen
          }}
          classes={{
            select: classes.select
          }}
          onChange={this.onFieldChange}
          value={value.id || ""}
          inputProps={{
            name: column.key,
            id: `form_select_${column.key}`
          }}>
          <MenuItem
            disabled
            classes={{
              root: classes.selectMenuItem
            }}>
            {this.state.loading ? "Cargando..." : column.title}
          </MenuItem>
          <MenuItem value="+" className={classes.menuItem}>
            <ListItemIcon className={classes.icon}>
              <Add />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.primary }} primary="Crear Nuevo" />
          </MenuItem>
          <Divider />
          {this.state.options.map(option => {
            return (
              <MenuItem
                key={option.id}
                classes={{
                  root: classes.selectMenuItem,
                  selected: classes.selectMenuItemSelected
                }}
                value={option.id}>
                {option.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}

export default withStyles(styles)(LookUpElement);
