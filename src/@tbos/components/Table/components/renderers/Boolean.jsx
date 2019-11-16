import React from "react";
import { makeStyles } from "@material-ui/core/styles";

var useStyles = makeStyles(() => {
  return {};
});

export default function(column) {
  return function BooleanRenderer(props) {
    var classes = useStyles();
    var value = props.value;
    if (value || value == 1) return "Si";
    else return "No";
  };
}
