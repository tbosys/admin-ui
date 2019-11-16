import React from "react";
import { makeStyles } from "@material-ui/core/styles";

var useStyles = makeStyles(() => {
  return {};
});

export default function(column) {
  return function OneToOneRenderer(props) {
    var classes = useStyles();
    var value = props.value;
    if (!value) return "";
    if (props.row[column.key] && props.row["__" + column.key]) return props.row["__" + column.key];
    return value;
  };
}
