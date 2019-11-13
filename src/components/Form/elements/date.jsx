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
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid } from "@material-ui/core";

const styles = theme => ({});

class StringElement extends BaseElement {
  getValue() {
    let column = this.props.column;
    return this.props.item[column.key] || "";
  }

  render() {
    let column = this.props.column;
    let value = this.getValue();
    //if (typeof value == "undefined") value = null;
    var size = this.props.size;
    if (column.ui && column.ui.fullWidth) size = 12;

    return (
      <CustomInput
        labelText={column.title}
        success={this.props.fieldStatus[column.key] == true}
        error={Array.isArray(this.props.fieldStatus[column.key])}
        labelProps={{ shrink: true }}
        inputProps={{
          name: column.key,
          disabled: column.readOnly || false,
          value: value,
          type: "date",
          onBlur: this.onBlur,
          onKeyPress: this.keyPress,
          helpText: column.helpText,

          onChange: this.onFieldChange
        }}
        formControlProps={{
          fullWidth: true
        }}
      />
    );
  }
}

export default withStyles(styles)(StringElement);
