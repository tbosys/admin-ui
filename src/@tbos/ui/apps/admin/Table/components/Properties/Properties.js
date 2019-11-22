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
import PropertyDialog from "./components/PropertyDialog";

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
    maxHeight: 300,
    width: "100%"
  },

  mobileList: {
    overflow: "auto",
    minHeight: "auto",
    maxHeight: "auto",
    width: "100%"
  },

  button: {
    margin: theme.spacing(0.5, 0)
  }
}));

export default function ProfileSelector(props) {
  const classes = useStyles();
  const [showDialog, setShowDialog] = React.useState(false);

  const [editColumnId, setEditColumnId] = React.useState(null);

  const matches = useMediaQuery("(min-width:400px)");

  React.useEffect(() => {}, []);

  React.useEffect(() => {}, [props.value]);

  function createColumn(profile) {
    return () => {
      var id = `_${parseInt(Math.random() * 100000)}`;
      const newItem = {
        id: id,
        type: profile.title,
        default: profile.default || "",
        length: profile.length || 10,
        sort: profile.sort || false
      };
      setEditColumnId(id);
      props.onChange(props.column, [...props.value, newItem]);
      setShowDialog(false);
    };
  }

  function deleteColumn(column) {
    return e => {
      if (e) e.preventDefault();
      if (e) e.stopPropagation();
      props.onChange(
        props.column,
        props.value.filter(filterItem => column.id != filterItem.id).concat([]) //concat creates new obj
      );
    };
  }

  function selectColumn(column) {
    return () => {
      setEditColumnId(column.id);
    };
  }

  function onClose() {
    var item = props.value.filter(
      filterItem => editColumnId == filterItem.id
    )[0]; //concat creates new obj
    if (!item.name) deleteColumn({ id: editColumnId })();
    setEditColumnId(null);
  }

  function onSave(item) {
    props.onChange(
      props.column,
      props.value.filter(filterItem => item.id != filterItem.id).concat([item])
    );
    setEditColumnId(null);
  }

  return (
    <div>
      {editColumnId != null || showDialog ? (
        <PropertyDialog
          createColumn={createColumn}
          item={
            props.value.filter(filterItem => editColumnId == filterItem.id)[0]
          }
          onSave={onSave}
          onClose={onClose}
        />
      ) : null}

      <Grid container spacing={2} className={classes.root}>
        <Grid item md={6} xs={12}>
          <Paper className={classes.paper}>
            <Grid justify="space-between" container>
              <Typography>Columns</Typography>
              <Fab
                color="primary"
                className={classes.fab}
                size="small"
                onClick={() => {
                  setShowDialog(true);
                }}
              >
                <AddIcon />
              </Fab>
            </Grid>
            <List
              className={!matches ? classes.mobileList : classes.list}
              dense
              component="div"
              role="list"
            >
              {props.value.map(column => {
                return (
                  <React.Fragment>
                    <ListItem
                      onClick={selectColumn(column)}
                      key={column.id}
                      role="listitem"
                    >
                      <ListItemText primary={column.title} />
                      {typeof column.id == "string" && (
                        <ListItemSecondaryAction>
                          <IconButton
                            onClick={deleteColumn(column)}
                            edge="end"
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      )}
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                );
              })}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
