import React from "react";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardActionArea";

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbarTitle: {
    flex: 1
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto"
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0
  },
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
  },
  mainGrid: {
    marginTop: theme.spacing(3)
  },
  card: {
    display: "flex"
  },
  cardDetails: {
    flex: 1
  },
  cardMedia: {
    width: 160
  },
  cardGrid: {
    marginLeft: 30,
    marginRight: 30
  },

  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0)
  },
  sidebarAboutBox: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200]
  },
  sidebarSection: {
    marginTop: theme.spacing(3)
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0)
  }
}));

export default function Album() {
  const classes = useStyles();

  return (
    <Box m={3}>
      <Grid container spacing={1} justify="space-around">
        <FeatureList
          title="Certificados"
          items={[
            <div>Hilco - Curso Soldadura 1 (50)</div>,
            <div>Hilco - Curso 201 (100)</div>,
            <div>Rodco - Ventas (150)</div>,
            <div>Rodco - Cotizaciones (200)</div>,
            <div>Yale - Llavines (350)</div>
          ]}
        />
        <FeatureList
          title="Premios"
          items={[
            <div>Tarjeta de Regalo Walmart - (1000)</div>,
            <div>Pizza Hut (1000)</div>,
            <div>Motocicleta Honda CBX (10000)</div>
          ]}
        />
        <FeatureList
          title="Puntos"
          items={[
            <div>10Kg Soldadura Hilco (20)</div>,
            <div>10 Discos Hilco</div>,
            <div>1 Llaving/Cerradura Delko (20)</div>,
            <div>5 Candados Delko (20)</div>,
            <div>*Productos Yale</div>,
            <div>*Productos Coflex</div>
          ]}
        />
      </Grid>
    </Box>
  );
}

function FeatureList(props) {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={4}>
      <Box m={1}>
        <CardActionArea component="a" href="#">
          <div className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h6">
                  {props.title}
                </Typography>

                {props.items.map(item => {
                  return item;
                })}

                <Typography variant="subtitle1" color="primary">
                  Continue reading...
                </Typography>
              </CardContent>
            </div>
          </div>
        </CardActionArea>
      </Box>
    </Grid>
  );
}
