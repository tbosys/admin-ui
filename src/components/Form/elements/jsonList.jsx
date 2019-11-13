import React, { Fragment } from "react";
import BaseElement from "./base";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardAction from "components/Card/CardAction.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import InputLabel from "@material-ui/core/InputLabel";
import CustomInput from "components/CustomInput/CustomInput";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid } from "@material-ui/core";

const styles = theme => ({});

class StringElement extends BaseElement {
  constructor() {
    super();
    this.textInput = React.createRef();
  }

  getValue() {
    let column = this.props.column;
    if (!this.props.item[column.key]) return [];
    var value = this.props.item[column.key] || "[]";

    try {
      return JSON.parse(value);
    } catch (e) {
      return [this.props.item[column.key]];
    }
  }

  onFieldChange = (value, remove) => {
    var name = this.props.column.key;
    var originalValue = this.getValue();
    if (!remove) originalValue.push(value);
    else {
      var index = originalValue.indexOf(value);
      originalValue.splice(index, 1);
    }
    this.props.onChange(name, JSON.stringify(originalValue));
  };

  onBlur = e => {
    var value = e.value || e.target.value;
    this.onFieldChange(value);
    e.currentTarget.value = "";
  };

  keyPress = e => {
    if (e.keyCode == 13) {
      var value = e.value || e.target.value;
      this.onFieldChange(value);
      e.currentTarget.value = "";
    }
  };

  onRemove = e => {
    var value = e.currentTarget.dataset.value;
    this.onFieldChange(value, true);
  };

  render() {
    let column = this.props.column;
    let value = this.getValue();
    if (typeof value == "undefined") value = "";
    var size = this.props.size;
    if (column.ui && column.ui.fullWidth) size = 12;

    return (
      <Fragment>
        <CustomInput
          labelText={column.title}
          success={this.props.fieldStatus[column.key] == true}
          error={Array.isArray(this.props.fieldStatus[column.key])}
          inputProps={{
            ref: this.textInput,
            name: column.key,
            placeholder: "",
            type: "text",
            onBlur: this.onBlur,
            onKeyPress: this.keyPress
          }}
          formControlProps={{
            fullWidth: true
          }}
        />
        {value.map(value => {
          return (
            <div data-value={value} onClick={this.onRemove}>
              {value}
            </div>
          );
        })}
      </Fragment>
    );
  }
}

export default withStyles(styles)(StringElement);
