import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn(props) {
  const classes = useStyles();

  let [code, setCode] = React.useState("");

  function onChange(e) {
    setCode(e.currentTarget.value);
  }

  function onCode() {
    if (code && code.length > 2) return props.onCode(code);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Ingreso a Rodco
        </Typography>
        <Typography variant="subtitle2">Hemos enviado un codigo a su telefono/email</Typography>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            disabled
            value={props.email}
            label="Email"
            name="email"
            autoComplete="email"
          />

          <TextField
            onChange={onChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Codigo"
          />
          <Button
            onClick={onCode}
            fullWidth
            value={code}
            variant="contained"
            color="primary"
            className={classes.submit}>
            Ingresar
          </Button>
          <Grid container>
            <Grid item xs />
            <Grid item></Grid>
          </Grid>
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Si tiene problemas llamenos al +506 2240-9966"}
    </Typography>
  );
}
