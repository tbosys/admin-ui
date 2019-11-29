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

export default function ProfileSelector(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);

  const [selectedProfileIds, setSelectedProfileIds] = React.useState([]);
  const [selectedValue, setSelectedValue] = React.useState([]);

  const matches = useMediaQuery("(min-width:400px)");

  const { fetch, data: profiles, loading, error } = useQuery({
    path: `crm/profile/get`,
    limit: 100000
  });

  const {
    fetch: fetchProfilesForOwner,
    data: profilesForOwner,
    loading: profileOwnerLoading,
    error: profileOwnerError
  } = useQuery({
    path: `crm/profileOwner/get`,
    limit: 100000
  });

  React.useEffect(() => {
    fetch();
    if (props.itemId)
      fetchProfilesForOwner({ filters: [["ownerId", "=", props.itemId]] });
  }, []);

  React.useEffect(() => {
    var value = props.value || [];
    if (Array.isArray(value)) {
      setSelectedValue(value);
      setSelectedProfileIds(value.map(item => item.profileId));
    }
  }, [props.value]);

  React.useEffect(() => {
    props.onChange(props.column, profilesForOwner);
  }, [profilesForOwner]);

  const handleToggle = profile => () => {
    const currentIndex = checked.indexOf(profile.id);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(profile.id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const onSelectProfiles = () => {
    const newItems = selectedValue.concat(
      profiles
        .filter(
          profile =>
            checked.indexOf(profile.id) > -1 &&
            selectedProfileIds.indexOf(profile.id) == -1
        )
        .map(profile => {
          return {
            id: "_" + Math.random(),
            __profileId: profile.name,
            profileId: profile.id,
            ownerId: props.itemId
          };
        })
    );

    props.onChange(props.column, newItems);
    setChecked([]);
  };

  const selectedList = () => {
    return (
      <Paper className={classes.paper}>
        <Typography>Selected Profiles</Typography>
        <List
          className={!matches ? classes.mobileList : classes.list}
          dense
          component="div"
          role="list"
        >
          {selectedValue.map(item => {
            return (
              <React.Fragment>
                <ListItem key={item.id} role="listitem">
                  <ListItemText primary={item.__profileId} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
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
    );
  };

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <Grid justify="space-between" container>
            <Grid item xs={6} md={6}>
              <Box mt={1.5}>
                <Typography>Profiles</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Fab
                size="small"
                color="primary"
                className={classes.button}
                onClick={onSelectProfiles}
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
            {profiles
              .filter(profile => selectedProfileIds.indexOf(profile.id) == -1)
              .map(profile => {
                const labelId = `transfer-list-item-${profile.id}-label`;

                return (
                  <ListItem
                    key={profile.id}
                    role="listitem"
                    button
                    onClick={handleToggle(profile)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={checked.indexOf(profile.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      secondary={profile.description}
                      primary={profile.name}
                    />
                  </ListItem>
                );
              })}
            <ListItem />
          </List>
        </Paper>
      </Grid>

      <Grid item md={6} xs={12}>
        {selectedList()}
      </Grid>
    </Grid>
  );
}
