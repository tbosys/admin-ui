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

import InputLabel from "@material-ui/core/InputLabel";
import CustomInput from "components/CustomInput/CustomInput";
import numeral from "numeral";
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid } from "@material-ui/core";

const styles = theme => ({});

class NumberElement extends BaseElement {
  transformValue(value) {
    return parseFloat(value);
  }

  getValue() {
    let column = this.props.column;
    var value = this.props.item[column.key];

    if (column.readOnly && value && value > 0) return numeral(value).format("0,0.00");
    if (value == 0) return value;
    if (value > 0) return parseFloat(value);

    return "";
  }

  render() {
    let column = this.props.column;
    let value = this.getValue();
    if (typeof value == "undefined") value = "";
    var size = this.props.size;
    if (column.ui && column.ui.fullWidth) size = 12;

    return (
      <CustomInput
        labelText={column.title}
        success={this.props.fieldStatus[column.key] == true}
        error={Array.isArray(this.props.fieldStatus[column.key])}
        inputProps={{
          disabled: column.readOnly || false,
          name: column.key,
          value: value,
          type: column.readOnly ? "text" : "number",
          helpText: column.helpText,

          onBlur: this.onBlur,
          onKeyPress: this.keyPress,
          onChange: this.onFieldChange
        }}
        formControlProps={{
          fullWidth: true
        }}
      />
    );
  }
}

export default withStyles(styles)(NumberElement);
