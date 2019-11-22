import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

import Paper from "@material-ui/core/Paper";

import { Typography, Divider } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Fab from "@material-ui/core/Fab";
import Box from "@material-ui/core/Box";
import useQuery from "@tbos/ui/business/hooks/useQuery";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "auto"
  },
  paper: {
    padding: theme.spacing(1, 1.5)
  },
  list: {
    overflow: "auto",
    minHeight: 300,
    maxHeight: 300
  },

  mobileList: {
    overflow: "auto",
    minHeight: "auto",
    maxHeight: "auto"
  },

  button: {
    margin: theme.spacing(0.5, 0)
  }
}));

export default function PropertySelector(props) {
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:400px)");

  return (
    <List
      className={!matches ? classes.mobileList : classes.list}
      dense
      component="div"
      role="list"
    >
      {[
        {
          title: "integer",
          length: 10,
          default: 0,
          sort: true,
          description: "number, no decimal between -1000000 and 10000000"
        },
        {
          title: "string",
          length: 255,
          sort: true,
          description: "text less than 255 letters"
        }
      ].map(profile => {
        const labelId = `transfer-list-item-${profile.title}-label`;

        return (
          <ListItem
            key={profile.title}
            role="listitem"
            button
            onClick={props.createColumn(profile)}
          >
            <ListItemText
              id={labelId}
              secondary={profile.description}
              primary={profile.title}
            />
          </ListItem>
        );
      })}
      <ListItem />
    </List>
  );
}
