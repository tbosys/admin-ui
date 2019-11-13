import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {". Built with "}
      <Link color="inherit" href="https://material-ui.com/">
        Material-UI.
      </Link>
    </Typography>
  );
}

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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp(props) {
  const classes = useStyles();

  let [state, setState] = React.useState({ name: "", company: "", phone: "", email: "-" });

  React.useEffect(() => {
    setState({ ...state, phone: props.phone || "" });
  }, []);

  function onChange(key) {
    return e => {
      return setState({ ...state, [key]: e.currentTarget.value });
    };
  }

  function onRegister() {
    props.onRegister({ ...state });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <div className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="name"
                variant="outlined"
                required
                onChange={onChange("name")}
                value={state.name}
                fullWidth
                label="Nombre"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={onChange("company")}
                variant="outlined"
                required
                fullWidth
                value={state.company}
                label="Empresa"
                autoComplete="company"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChange("phone")}
                variant="outlined"
                required
                fullWidth
                value={state.phone}
                label="Teléfono"
                autoComplete="phone"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            onClick={onRegister}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Ingresar
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link onClick={props.onChangeView} variant="body2">
                Ya se registros? Ingrese aquí
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
