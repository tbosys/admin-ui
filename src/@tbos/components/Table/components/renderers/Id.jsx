import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import numeral from "numeral";

var useStyles = makeStyles(() => {
  return {};
});

export default function(column, onView) {
  return function NumberRenderer(props) {
    var classes = useStyles();

    return <a onClick={() => onView(props.value)}>{props.value}</a>;
  };
}
