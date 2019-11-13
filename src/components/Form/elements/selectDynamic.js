import React from "react";
import BaseElement from "./base";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAction from "components/Card/CardAction.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import CustomInput from "components/CustomInput/CustomInput";

import withStyles from "@material-ui/core/styles/withStyles";

// material-ui components
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import customSelectStyle from "assets/jss/material-dashboard-pro-react/customSelectStyle.jsx";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

import Edit from "@material-ui/icons/Edit";
import Check from "@material-ui/icons/Check";
import ErrorIcon from "@material-ui/icons/Error";
import { simpleApi } from "redux/reducers/api";
import { Grid } from "@material-ui/core";

const styles = theme => ({
  ...customSelectStyle,
  icon_green: {
    color: "green"
  },
  icon_red: {
    color: "red"
  }
});

class SelectDynamicElement extends BaseElement {
  state = {
    options: []
  };

  componentDidMount() {
    this.reload(this.props);
  }

  componentWillReceiveProps(nextProps) {
    var column = this.props.column.queryOnChange;

    if (column && column[0]) {
      var old = this.props.item[column[0]];
      var newL = nextProps.item[column[0]];
      if (old != newL) {
        this.reload(nextProps);
      }
    }
  }

  reload(props) {
    props
      .dispatchSimpleApi(this.column, props.column.route, {
        id: props.item.id,
        item: props.item,
        ...props.column.metadata
      })

      .then(response => {
        this.setState({ options: response });
      });
  }

  transformValue(item) {
    return item;
  }

  getValue() {
    let column = this.props.column;
    return this.props.item[column.key];
  }

  isError() {
    let column = this.props.column;
    if (this.props.fieldStatus[column.key] == false) return true;
    return Array.isArray(this.props.fieldStatus[column.key]);
  }

  getIconColor() {
    let column = this.props.column;
    var color = "";
    if (this.props.fieldStatus[column.key] == true) color = "icon_green";
    else if (this.isError()) color = "icon_red";

    return color;
  }

  onOpen = e => {};

  onFieldChange = e => {
    var value = e.value || e.target.value;
    var name = this.props.column.key;
    if (value == "") value = {};

    this.props.onChange(name, value);
  };

  getIcon() {
    let column = this.props.column;

    if (this.props.fieldStatus[column.key] == true) return Check;
    else if (this.isError()) return ErrorIcon;
    else return ArrowDropDownIcon;
  }

  render() {
    const { classes } = this.props;

    let column = this.props.column;
    let value = this.getValue();
    if (typeof value == "undefined") value = "";
    var size = this.props.size;
    if (column.ui && column.ui.fullWidth) size = 12;

    var options = column.enum;

    return (
      <FormControl error={this.isError()} fullWidth className={classes.selectFormControl}>
        <InputLabel htmlFor={`form_select_${column.key}`} className={classes.selectLabel}>
          {column.title}
        </InputLabel>
        <Select
          IconComponent={this.getIcon()}
          MenuProps={{
            className: classes.selectMenu
          }}
          classes={{
            select: classes.select,
            icon: classes[this.getIconColor()]
          }}
          onChange={this.onFieldChange}
          value={value}
          onOpen={this.onOpen}
          inputProps={{
            name: column.key,
            id: `form_select_${column.key}`
          }}>
          <MenuItem
            disabled
            classes={{
              root: classes.selectMenuItem
            }}>
            {column.title}
          </MenuItem>
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

export default withStyles(styles)(SelectDynamicElement);
