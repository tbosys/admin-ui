import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { blue, red } from "@material-ui/core/colors";

import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import CheckCircle from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 2
  },
  icon: {},
  iconHover: {
    fontSize: 18,
    "&:hover": {
      color: blue[200]
    }
  }
}));

export default function SvgIcons(props) {
  const classes = useStyles();

  function onClick(progress) {
    return function() {
      props.onClick(props.item, progress);
    };
  }

  return (
    <div className={classes.root}>
      {props.item.progress == 100 ? (
        <CheckCircle onClick={onClick(0)} className={classes.iconHover} color="primary" />
      ) : (
        <CheckCircleOutline onClick={onClick(100)} className={classes.iconHover} color="default" />
      )}
    </div>
  );
}
