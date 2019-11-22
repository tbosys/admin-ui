import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/user/erondu)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)"
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0
    }
  }
}));

export default function Splash() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper className={classes.mainFeaturedPost}>
        {<img style={{ display: "none" }} src="https://source.unsplash.com/user/erondu" alt="background" />}
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                Rodco Punto de Venta
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                La forma divertidad de vender, aprender y ganar!
              </Typography>
              <Link variant="subtitle1" href="#">
                Continue reading…
              </Link>
            </div>
          </Grid>
        </Grid>
      </Paper>

      <Box mx={2}>
        <Typography component="h2" variant="h4"></Typography>
      </Box>

      <Box mx={2}>
        <Typography component="h2" variant="h6">
          Este programa lo ayuda a obtener certificaciones que le serviran en su carrera, y tambien premios
          para disfrutar con sus compañeros.
        </Typography>
      </Box>
    </React.Fragment>
  );
}
