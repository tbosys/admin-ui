import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";

var useStyles = makeStyles(() => {
  return {
    avatar: {
      margin: 0,
      margin: 10,
      color: "#fff",

      width: 25,
      height: 25,
      margin: 0,
      fontSize: 18
    },
    purpleAvatar: {
      marginLeft: 8,
      margin: 10,
      color: "#fff",

      width: 25,
      height: 25,
      margin: 0,
      fontSize: 18
    }
  };
});

export default function(column) {
  return function Photo(props) {
    var classes = useStyles();

    if (!props.value) return <Avatar className={classes.purpleAvatar}>-</Avatar>;

    return <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.avatar} />;
  };
}
