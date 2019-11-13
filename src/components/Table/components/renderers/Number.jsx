import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import numeral from "numeral";

var useStyles = makeStyles(() => {
  return {};
});

export default function(column) {
  return function NumberRenderer(props) {
    var classes = useStyles();
    var value = numeral(props.value).format("0,0.00");
    if (!value) return "";

    return value;
  };
}
