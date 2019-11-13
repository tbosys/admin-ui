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
import FormHelperText from "@material-ui/core/FormHelperText";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { FormLabel } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  title: {
    marginBottom: 3
  }
});

class NumberElement extends BaseElement {
  getValue() {
    let column = this.props.column;
    var value = this.props.item[column.key];
    if (!value || value == "") value = false;
    return value;
  }

  onFieldChange = e => {
    var value = e.target.checked;
    var name = this.props.column.key;
    this.props.onChange(name, value);
  };

  render() {
    const { classes } = this.props;
    let column = this.props.column;
    let value = this.getValue();
    if (typeof value == "undefined") value = false;
    var size = this.props.size;
    if (column.ui && column.ui.fullWidth) size = 12;
    let checked = this.getValue();
    return (
      <Fragment>
        <Typography style={{ color: "#999", marginTop: 7 }} variant="caption">
          {column.title}
        </Typography>
        <Switch checked={checked} onChange={this.onFieldChange} />

        {column.helpText ? <FormHelperText>{column.helpText}</FormHelperText> : null}
      </Fragment>
    );
  }
}

export default withStyles(styles)(NumberElement);
