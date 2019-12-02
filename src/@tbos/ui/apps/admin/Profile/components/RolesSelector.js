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
import useFetch from "@tbos/ui/business/hooks/useFetch";

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

export default function RoleSelector(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  const matches = useMediaQuery("(min-width:400px)");

  const { fetch: fetchRoles, data: roles, loading, error } = useFetch({
    path: `crm/role/list`
  });

  React.useEffect(() => {
    fetchRoles();
  }, []);

  const handleToggle = role => () => {
    const currentIndex = checked.indexOf(role.name);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(role.name);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const onSelectRoles = () => {
    const newItems = props.value.concat(checked);
    props.onChange(props.column, newItems);
    setChecked([]);
  };

  function onRemoveRole(role) {
    return () => {
      const currentIndex = props.value.indexOf(role);
      let newItems = [...props.value];
      newItems.splice(currentIndex, 1);
      props.onChange(props.column, newItems);
    };
  }

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <Grid justify="space-between" container>
            <Grid item xs={6} md={6}>
              <Box mt={1.5}>
                <Typography>Roles</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Fab
                size="small"
                color="primary"
                className={classes.button}
                onClick={onSelectRoles}
                aria-label="move selected right"
              >
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>

          <List
            className={!matches ? classes.mobileList : classes.list}
            dense
            component="div"
            role="list"
          >
            {roles
              .filter(
                role =>
                  props.value &&
                  props.value.length != null &&
                  props.value.indexOf(role.name) == -1
              )
              .map(role => {
                const labelId = `transfer-list-item-${role.name}-label`;

                return (
                  <ListItem
                    key={role.name}
                    role="listitem"
                    button
                    onClick={handleToggle(role)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={checked.indexOf(role.name) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={role.name} />
                  </ListItem>
                );
              })}
            <ListItem />
          </List>
        </Paper>
      </Grid>

      <Grid item md={6} xs={12}>
        <Paper className={classes.paper}>
          <Typography>Selected Roles</Typography>
          <List
            className={!matches ? classes.mobileList : classes.list}
            dense
            component="div"
            role="list"
          >
            {props.value.map(selectedRole => {
              return (
                <React.Fragment>
                  <ListItem key={selectedRole} role="listitem">
                    <ListItemText primary={selectedRole} />
                    <ListItemSecondaryAction>
                      <IconButton
                        onClick={onRemoveRole(selectedRole)}
                        edge="end"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
}
