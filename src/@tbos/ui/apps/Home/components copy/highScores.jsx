import React from "react";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles(theme => ({}));

function HightScroreListItem({ name, company, puntos }) {
  const classes = useStyles();

  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        primary={puntos + " puntos"}
        secondary={
          <React.Fragment>
            <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
              {name}
            </Typography>
            {company}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

export default function Puntos() {
  const classes = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={4}>
        <Box m={4}>
          <Typography component="h1" variant="h5" color="inherit" gutterBottom>
            Puntos mas Altos
          </Typography>
          <List className={classes.root}>
            <HightScroreListItem name="Pedrio 1" company="Ferreteria dhdhjd hdjhd" puntos="25 mil" />
            <Divider variant="inset" component="li" />
            <HightScroreListItem name="Pedrio 1" company="Ferreteria dhdhjd hdjhd" puntos="25 mil" />
            <Divider variant="inset" component="li" />
            <HightScroreListItem name="Pedrio 1" company="Ferreteria dhdhjd hdjhd" puntos="25 mil" />
          </List>
        </Box>
      </Grid>
    </Grid>
  );
}
