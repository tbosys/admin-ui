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

import Input from "@material-ui/core/Input";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import { Grid } from "@material-ui/core";
import { Fragment } from "react";

const styles = theme => ({
  ...customSelectStyle,
  icon_green: {
    color: "green"
  },
  icon_red: {
    color: "red"
  },
  formControl: {
    margin: theme.spacing,
    minWidth: 120
  },
  chips: {
    display: "flex",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing / 4
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 8 + ITEM_PADDING_TOP,
      width: 350
    }
  }
};

class MultiSelectDynamicElement extends BaseElement {
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

  handleChange = event => {
    this.setState({ name: event.target.value });
  };

  handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }

    this.onFieldChange(value);
  };

  transformValue(item) {
    return item;
  }

  getValue() {
    let column = this.props.column;
    var value = this.props.item[column.key];
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return value.split(",");
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

    this.props.onChange(name, value.join(","));
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
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-chip">{this.props.column.title}</InputLabel>
        <Select
          multiple
          value={value}
          onChange={this.onFieldChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(item => (
                <Chip key={item} label={item} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}>
          {this.state.options.map(item => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

export default withStyles(styles)(MultiSelectDynamicElement);
