import React from "react";
import BaseElement from "components/SmartForm/elements/base";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({});

class NumberElement extends BaseElement {
  transformValue(value) {
    return parseFloat(value);
  }

  getValue() {
    let column = this.props.column;
    var value = this.props.item[column.key];
    if (value == 0) return value;

    if (this.props.item.tipoDocumento == "NC") return parseFloat(value);
    if (this.props.item.tipo == "NC") return parseFloat(value);
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
      <GridItem key={column.key} xs={size || 4}>
        <div>
          <CustomInput
            labelText={column.title}
            success={this.props.fieldStatus[column.key] == true}
            error={Array.isArray(this.props.fieldStatus[column.key])}
            inputProps={{
              step: ".00001",
              name: column.key,
              value: value,
              type: "number",
              onBlur: this.onBlur,
              onKeyPress: this.keyPress,
              onChange: this.onFieldChange
            }}
            formControlProps={{
              fullWidth: true
            }}
          />
        </div>
      </GridItem>
    );
  }
}

export default withStyles(styles)(NumberElement);
