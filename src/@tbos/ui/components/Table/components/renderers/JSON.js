import React from "react";
import { makeStyles } from "@material-ui/core/styles";

var useStyles = makeStyles(() => {
  return {};
});

export default function(column) {
  return function IntegerRenderer(props) {
    var classes = useStyles();
    var value = JSON.stringify(props.value);
    if (!value) return "";

    return value;
  };
}
