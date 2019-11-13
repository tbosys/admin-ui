import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Table from "components/Table";
import Form from "components/Form";
import Toolbar from "components/Toolbar";
import useDimensions from "react-use-dimensions";
import { Link, Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Delete";
import CheckCircle from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%"
  }
}));

export default function Config(props) {
  const classes = useStyles();
  const [ref, { height }] = useDimensions();

  function onClick1() {}
  function onClick2() {}

  const actions = [
    <IconButton
      name="1"
      onClick={onClick1}
      edge="end"
      aria-label="account of current user"
      aria-haspopup="true"
      color="inherit">
      <CancelIcon />
    </IconButton>,
    <IconButton name="b" onClick={onClick2} aria-label="show more" aria-haspopup="true" color="inherit">
      <CheckCircle />
    </IconButton>
  ];

  return (
    <div className={classes.root} ref={ref}>
      <Toolbar actions={actions} match={props.match} title={props.route.title}></Toolbar>
      ok
    </div>
  );
}
